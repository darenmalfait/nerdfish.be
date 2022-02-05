import { json } from 'remix'

import { getErrorMessage, getNonNull } from './misc'

import type { NonNullProperties, ValidationTranslationKey } from '~/types'

type ErrorMessage = string
type NoError = null
type FormValue = string | null

async function handleFormSubmission<
  ActionData extends {
    status: 'success' | 'error'
    fields: { [field: string]: FormValue }
    errors: { [field: string]: ErrorMessage | NoError }
  },
>({
  form,
  request,
  validators,
  // @ts-expect-error ts(2322) 🤷‍♂️
  actionData = { fields: {}, errors: {} },
  handleFormValues,
}: {
  validators: {
    [Key in keyof ActionData['errors']]: (
      formValue: FormValue,
      fields: ActionData['fields'],
    ) => Promise<ErrorMessage | NoError> | ErrorMessage | NoError
  }
  actionData?: ActionData
  handleFormValues: (
    formValues: NonNullProperties<ActionData['fields']>,
  ) => Response | Promise<Response>
} & (
  | {
      form: URLSearchParams
      request?: never
    }
  | {
      form?: never
      request: Request
    }
)): Promise<Response> {
  try {
    if (!form) {
      const requestText = await request!.text()
      form = new URLSearchParams(requestText)
    }

    // collect all values first because validators can reference them
    for (const fieldName of Object.keys(validators)) {
      const formValue = form.get(fieldName)
      // Default the value to empty string so it doesn't have trouble with
      // getNonNull later. This allows us to have a validator that allows
      // for optional values.
      actionData.fields[fieldName] = formValue ?? ''
    }

    await Promise.all(
      Object.entries(validators).map(async ([fieldName, validator]) => {
        const formValue = form!.get(fieldName)
        // Default the value to empty string so it doesn't have trouble with
        // getNonNull later. This allows us to have a validator that allows
        // for optional values.
        actionData.errors[fieldName] = await validator(
          formValue,
          actionData.fields,
        )
      }),
    )

    if (Object.values(actionData.errors).some(err => err !== null)) {
      return json({ ...actionData, status: 'error' }, 400)
    }

    const nonNullFields = getNonNull(actionData.fields)
    // not sure why, but it wasn't happy without the type cast 🤷‍♂️
    const response = await handleFormValues(
      nonNullFields as NonNullProperties<ActionData['fields']>,
    )
    return response
  } catch (error: unknown) {
    actionData.errors.generalError = getErrorMessage(error)
    return json(actionData, 500)
  }
}

async function getErrorForRecaptcha(
  recaptcha: string | null,
): Promise<ValidationTranslationKey> {
  if (!recaptcha) return 'recaptcha-validation-required'

  const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRETKEY}&response=${recaptcha}`

  const recaptchaRes = await fetch(verifyUrl, { method: 'POST' })

  const recaptchaJson = await recaptchaRes.json()

  if (!recaptchaJson.success) {
    return 'recaptcha-validation-invalid'
  }

  return null
}

export { handleFormSubmission, getErrorForRecaptcha }
