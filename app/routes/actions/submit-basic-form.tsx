import type { TFunction } from 'i18next'
import * as React from 'react'
import { ActionFunction, json, LoaderFunction, redirect } from 'remix'

import { i18next } from '~/lib/services/i18n.server'

import { sendEmail } from '~/lib/services/send-email.server'
import {
  getErrorForRecaptcha,
  handleFormSubmission,
} from '~/lib/utils/actions.server'

function getErrorForName(name: string | null, t: TFunction): string | null {
  if (!name) return t('basic-form:errors.name.required')
  if (name.length > 60) return t('basic-form:errors.name.long')

  return null
}

function getErrorForEmail(email: string | null, t: TFunction): string | null {
  if (!email) return t('basic-form:errors.email.required')
  if (!/^.+@.+\..+$/.test(email)) return t('basic-form:errors.email.invalid')

  return null
}

function getErrorForMessage(
  message: string | null,
  t: TFunction,
): string | null {
  if (!message) return t('basic-form:errors.message.required')
  if (message.length <= 40) return t('basic-form:errors.message.short')
  if (message.length > 1001) return t('basic-form:errors.message.long')

  return null
}

export type ActionData = {
  status: 'success' | 'error'
  fields: {
    name?: string | null
    email?: string | null
    message?: string | null
    projectType?: string | null
    recaptchaResponse?: string | null
  }
  errors: {
    generalError?: string
    name?: string | null
    email?: string | null
    message?: string | null
    recaptchaResponse?: string | null
  }
}

export const action: ActionFunction = async ({ request }) => {
  const translate = await i18next.getFixedT(request, 'basic-form')

  return handleFormSubmission<ActionData>({
    request,
    translate,
    validators: {
      name: getErrorForName,
      email: getErrorForEmail,
      message: getErrorForMessage,
      recaptchaResponse: getErrorForRecaptcha,
    },
    handleFormValues: async fields => {
      const { name, email, message, projectType } = fields

      const html = `
      name: ${name}
      email: ${email}
      projectType: ${projectType}
      message: ${message}
      `

      await sendEmail({
        to: `"Daren Malfait" <me@daren.be>`,
        from: 'me@daren.be',
        subject: 'Form submission from daren.be',
        html,
        replyTo: `${name} <${email}>`,
      })

      const actionData: ActionData = {
        fields,
        status: 'success',
        errors: {},
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
