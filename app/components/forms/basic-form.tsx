import * as React from 'react'

import { useFetcher } from 'remix'

import { Button } from '../buttons'

import { Field } from '.'

import { Alert, AlertType } from '~/components/elements'
import { useTranslations } from '~/context/translations-provider'
import type { ActionData } from '~/routes/actions/submit-basic-form'
import { useRecaptcha } from '~/utils/recaptcha'

function BasicForm() {
  const { execute } = useRecaptcha()
  const { Form, state, data, type, submit } = useFetcher<ActionData>()
  const { t } = useTranslations()

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const form = new FormData(event.currentTarget)
    const token = await execute()
    form.append('recaptchaResponse', token)

    return await submit(form, {
      method: 'post',
      action: '/actions/submit-basic-form',
    })
  }

  const emailSuccessfullySent = type === 'done' && data?.status === 'success'

  return (
    <Form noValidate onSubmit={onSubmit}>
      <fieldset>
        <div className="space-y-8">
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
          <Field
            type="textarea"
            label={t('message-label') as string}
            name="message"
            id="message"
            error={data?.errors.message && t(data?.errors.message)}
          />
          {emailSuccessfullySent ? (
            <Alert type={AlertType.Success}>
              {t('send-success')}{' '}
              <span role="img" aria-label="party popper emoji">
                🎉
              </span>
            </Alert>
          ) : (
            <Button disabled={state !== 'idle'} type="submit" variant="primary">
              {t('send-button')}
            </Button>
          )}
        </div>
        {data?.errors.generalError ? (
          <Alert type={AlertType.Danger}>{data.errors.generalError}</Alert>
        ) : null}
        {data?.errors.recaptchaResponse ? (
          <Alert type={AlertType.Danger}>
            {t(data.errors.recaptchaResponse)}
          </Alert>
        ) : null}
      </fieldset>
    </Form>
  )
}

export { BasicForm }
