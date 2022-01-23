import sendgrid from '@sendgrid/mail'
import * as React from 'react'
import { ActionFunction, json, LoaderFunction, redirect } from 'remix'

import type { ValidationTranslationKey } from '~/types'

import { handleFormSubmission } from '~/utils/actions.server'

function getErrorForName(name: string | null): ValidationTranslationKey {
  if (!name) return 'name-validation-required'
  if (name.length > 60) return 'name-validation-long'

  return null
}

function getErrorForEmail(email: string | null): ValidationTranslationKey {
  if (!email) return 'email-validation-required'
  if (!/^.+@.+\..+$/.test(email)) return 'email-validation-invalid'

  return null
}

function getErrorForMessage(message: string | null): ValidationTranslationKey {
  if (!message) return 'message-validation-required'
  if (message.length <= 40) return 'message-validation-short'
  if (message.length > 1001) return 'message-validation-long'

  return null
}

export type BasicFormActionData = {
  status: 'success' | 'error'
  fields: {
    name?: string | null
    email?: string | null
    message?: string | null
  }
  errors: {
    generalError?: string
    name?: ValidationTranslationKey
    email?: ValidationTranslationKey
    message?: ValidationTranslationKey
  }
}

export const action: ActionFunction = async ({ request }) => {
  return handleFormSubmission<BasicFormActionData>({
    request,
    validators: {
      name: getErrorForName,
      email: getErrorForEmail,
      message: getErrorForMessage,
    },
    handleFormValues: async fields => {
      const { name, email, message } = fields

      sendgrid.setApiKey(process.env.SENDGRID_API_KEY as string)

      const html = `
      name: ${name} /n
      email: ${email} /n
      message: ${message}
      `

      const msg = {
        to: `"Daren Malfait" <me@daren.be>`,
        from: 'me@daren.be',
        subject: 'Form submission from daren.be',
        html,
      }

      const actionData: BasicFormActionData = {
        fields,
        status: 'success',
        errors: {},
      }

      try {
        await sendgrid.send(msg)
      } catch (error) {
        actionData.errors.generalError =
          'Something went wrong, please try again later.'
      }

      return json(actionData)
    },
  })
}

export const loader: LoaderFunction = () => {
  return redirect('/')
}

export default function SubmitBasicForm() {
  return <div>Oops... You should not see this.</div>
}
