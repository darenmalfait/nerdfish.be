import * as React from 'react'
import { useFetcher } from 'remix'

import { Button } from '../buttons'

import { Field } from '.'

import { Alert, AlertType } from '~/components/elements'

import { useTranslations } from '~/context/translations-provider'
import type { ActionData } from '~/routes/actions/submit-basic-form'

function BasicForm() {
  const { Form, state, data, type } = useFetcher<ActionData>()
  const { t } = useTranslations()

  const emailSuccessfullySent = type === 'done' && data?.status === 'success'

  return (
    <Form noValidate method="post" action="/actions/submit-basic-form">
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
      </fieldset>
    </Form>
  )
}

export { BasicForm }
