import * as React from 'react'
import {
  Alert,
  Button,
  Field,
  FormHelperText,
  Label,
  RadioGroup,
} from '@daren/ui-components'
import {useFetcher} from '@remix-run/react'

import {useRecaptcha} from '~/lib/services/recaptcha'
import type {ActionData} from '~/routes/actions/submit-basic-form'

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
  const {Form, state, data, type, submit} = useFetcher<ActionData>()

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitError(null)

    const form = new FormData(event.currentTarget)

    execute()
      .then((token: string) => {
        form.append('recaptchaResponse', token)

        submit(form, {
          method: 'post',
          action: '/actions/submit-basic-form',
        })
      })
      .catch((error: any) => {
        setSubmitError(error.message)
      })
  }

  const emailSuccessfullySent = type === 'done' && data.status === 'success'

  return (
    <Form noValidate onSubmit={onSubmit}>
      <fieldset>
        <div className="mb-8 space-y-8">
          <Field label="Name" name="name" id="name" error={data?.errors.name} />
          <Field
            label="Email"
            name="email"
            id="email"
            error={data?.errors.email}
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
            error={data?.errors.message}
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
        {data?.errors.generalError ? (
          <Alert type="danger" description={data.errors.generalError} />
        ) : null}
        {data?.errors.recaptchaResponse ? (
          <Alert type="danger" description={data.errors.recaptchaResponse} />
        ) : null}
        {submitError ? (
          <Alert
            type="danger"
            description="There was an error submitting your form. Please try again."
          />
        ) : null}
      </fieldset>
    </Form>
  )
}

export {BasicForm}
