import * as React from 'react'
import {
  Alert,
  Button,
  Field,
  FormHelperText,
  Label,
  RadioGroup,
} from '@daren/ui-components'

import {useSubmit} from '~/lib/utils/form'
import {useRecaptcha} from '~/lib/utils/recaptcha'

function ProjectField() {
  const [project, setProject] = React.useState<any>('website')

  return (
    <RadioGroup
      name="projectType"
      value={project}
      onChange={setProject}
      label="Project"
      aria-label="Project"
    >
      <RadioGroup.Option value="website" label="Website" />
      <RadioGroup.Option value="application" label="Application" />
      <RadioGroup.Option value="event" label="Event" />
      <RadioGroup.Option value="other" label="Other" />
    </RadioGroup>
  )
}

function BasicForm({withProject}: {withProject?: boolean}) {
  const {execute} = useRecaptcha()
  const [submitError, setSubmitError] = React.useState<string | null>(null)
  const {state, result, submit, getFormValues} = useSubmit<{
    status: 'success' | 'error'
    errors?: any
  }>()

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setSubmitError(null)

    const formValues = getFormValues(event.currentTarget)

    async function submitForm(values: any) {
      return submit(values, {
        method: 'post',
        action: '/api/contact/submit-form',
      })
    }

    try {
      if (process.env.NEXT_PUBLIC_RECAPTCHA_SITEKEY) {
        const recaptchaResponse = await execute()

        const recaptchaFormValues = {
          ...formValues,
          recaptchaResponse,
        }

        await submitForm(recaptchaFormValues)
      } else {
        await submitForm(formValues)
      }
    } catch (error: any) {
      setSubmitError(error.message ?? 'Something went wrong.')
    }
  }

  const emailSuccessfullySent = state === 'idle' && result?.status === 'success'

  return (
    <form noValidate onSubmit={handleSubmit}>
      <fieldset>
        <div className="mb-8 space-y-8">
          <Field
            label="Name"
            name="name"
            id="name"
            error={result?.errors?.name}
          />
          <Field
            label="Email"
            name="email"
            id="email"
            error={result?.errors?.email}
          />
          {withProject ? (
            <div className="not-prose space-y-3">
              <Label>Project</Label>
              <ProjectField />
            </div>
          ) : null}
          <Field
            type="textarea"
            label="Message"
            name="message"
            id="message"
            error={result?.errors?.message}
          />
          <FormHelperText>
            We only use your data to get in touch with you.
          </FormHelperText>
          {emailSuccessfullySent ? (
            <Alert
              type="success"
              description={
                <p className="m-0 p-0">
                  Your message has been sent successfully.{' '}
                  <span role="img" aria-label="party popper emoji">
                    🎉
                  </span>
                </p>
              }
            />
          ) : (
            <Button disabled={state !== 'idle'} type="submit">
              Send message
            </Button>
          )}
        </div>
        {result?.errors?.generalError ? (
          <Alert type="danger" description={result.errors.generalError} />
        ) : null}
        {result?.errors?.recaptchaResponse ? (
          <Alert type="danger" description={result.errors.recaptchaResponse} />
        ) : null}
        {submitError ? (
          <Alert
            type="danger"
            description="There was an error submitting your form. Please try again."
          />
        ) : null}
      </fieldset>
    </form>
  )
}

export {BasicForm}
