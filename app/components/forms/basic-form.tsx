import {
  Alert,
  Field,
  FormHelperText,
  Label,
  RadioGroup,
} from '@daren/ui-components'
import * as React from 'react'
import { useTranslation } from 'react-i18next'
import { useFetcher } from 'remix'

import { Button } from '../buttons'

import { useRecaptcha } from '~/lib/utils/recaptcha'
import type { ActionData } from '~/routes/actions/submit-basic-form'

function ProjectField() {
  const { t } = useTranslation()
  const [project, setProject] = React.useState<string>('website')
  return (
    <RadioGroup
      name="projectType"
      value={project}
      onChange={setProject}
      label={t('basic-form:project.label')}
      aria-label={t('basic-form:project.label-alt')}
    >
      <RadioGroup.Option
        value="website"
        label={t('basic-form:project.website')}
      />
      <RadioGroup.Option
        value="application"
        label={t('basic-form:project.application')}
      />
      <RadioGroup.Option value="event" label={t('basic-form:project.event')} />
      <RadioGroup.Option value="other" label={t('basic-form:project.other')} />
    </RadioGroup>
  )
}

function BasicForm({ withProject }: { withProject?: boolean }) {
  const { execute } = useRecaptcha()
  const [submitError, setSubmitError] = React.useState<string | null>(null)
  const { Form, state, data, type, submit } = useFetcher<ActionData>()
  const { t } = useTranslation()

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
          <Field
            label={t('basic-form:fields.name')}
            name="name"
            id="name"
            error={data?.errors.name}
          />
          <Field
            label={t('basic-form:fields.email')}
            name="email"
            id="email"
            error={data?.errors.email}
          />
          {withProject && (
            <div className="space-y-3 not-prose">
              <Label>{t('basic-form:project')}</Label>
              <ProjectField />
            </div>
          )}
          <Field
            type="textarea"
            label={t('basic-form:fields.message')}
            name="message"
            id="message"
            error={data?.errors.message}
          />
          <FormHelperText>{t('basic-form:gdpr-message')}</FormHelperText>
          {emailSuccessfullySent ? (
            <Alert
              type="success"
              description={
                <p className="p-0 m-0">
                  {t('basic-form:success')}{' '}
                  <span role="img" aria-label="party popper emoji">
                    🎉
                  </span>
                </p>
              }
            />
          ) : (
            <Button disabled={state !== 'idle'} type="submit" variant="primary">
              {t('basic-form:send-button')}
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
            description={t('basic-form:errors.submit-error')}
          />
        ) : null}
      </fieldset>
    </Form>
  )
}

export { BasicForm }
