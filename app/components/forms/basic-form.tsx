import {
  Alert,
  Field,
  FormHelperText,
  Label,
  RadioGroup,
} from '@daren/ui-components'
import * as React from 'react'
import { useFetcher } from 'remix'

import { Button } from '../buttons'

import { useTranslations } from '~/context/translations-provider'
import { useRecaptcha } from '~/lib/utils/recaptcha'
import type { ActionData } from '~/routes/actions/submit-basic-form'

function ProjectField() {
  const { t } = useTranslations()
  const [project, setProject] = React.useState<string>('website')
  return (
    <RadioGroup
      name="projectType"
      value={project}
      onChange={setProject}
      label={t('contact-project-label')}
      aria-label={t('contact-project-label-alt')}
    >
      <RadioGroup.Option value="website" label={t('contact-project-website')} />
      <RadioGroup.Option
        value="application"
        label={t('contact-project-application')}
      />
      <RadioGroup.Option value="event" label={t('contact-project-event')} />
      <RadioGroup.Option value="other" label={t('contact-project-other')} />
    </RadioGroup>
  )
}

function BasicForm({ withProject }: { withProject?: boolean }) {
  const { execute } = useRecaptcha()
  const [submitError, setSubmitError] = React.useState<string | null>(null)
  const { Form, state, data, type, submit } = useFetcher<ActionData>()
  const { t } = useTranslations()

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitError(null)

    const form = new FormData(event.currentTarget)

    try {
      const token = await execute()
      form.append('recaptchaResponse', token)

      return submit(form, {
        method: 'post',
        action: '/actions/submit-basic-form',
      })
    } catch (error: any) {
      setSubmitError(error.message)
    }
  }

  const emailSuccessfullySent = type === 'done' && data?.status === 'success'

  return (
    <Form noValidate onSubmit={onSubmit}>
      <fieldset>
        <div className="mb-8 space-y-8">
          <Field
            label={t('name-label')}
            name="name"
            id="name"
            error={data?.errors.name && t(data?.errors.name)}
          />
          <Field
            label={t('email-label')}
            name="email"
            id="email"
            error={data?.errors.email && t(data?.errors.email)}
          />
          {withProject && (
            <div className="space-y-3 not-prose">
              <Label>{t('contact-project-title')}</Label>
              <ProjectField />
            </div>
          )}
          <Field
            type="textarea"
            label={t('message-label')}
            name="message"
            id="message"
            error={data?.errors.message && t(data?.errors.message)}
          />
          <FormHelperText>{t('gdpr-message')}</FormHelperText>
          {emailSuccessfullySent ? (
            <Alert
              type="success"
              description={
                <p className="p-0 m-0">
                  {t('send-success')}{' '}
                  <span role="img" aria-label="party popper emoji">
                    🎉
                  </span>
                </p>
              }
            />
          ) : (
            <Button disabled={state !== 'idle'} type="submit" variant="primary">
              {t('send-button')}
            </Button>
          )}
        </div>
        {data?.errors.generalError ? (
          <Alert type="danger" description={data.errors.generalError} />
        ) : null}
        {data?.errors.recaptchaResponse ? (
          <Alert type="danger" description={t(data.errors.recaptchaResponse)} />
        ) : null}
        {submitError ? (
          <Alert type="danger" description={t('send-error')} />
        ) : null}
      </fieldset>
    </Form>
  )
}

export { BasicForm }
