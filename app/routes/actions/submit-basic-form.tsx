import * as React from 'react'
import { ActionFunction, json, LoaderFunction, redirect } from 'remix'

import { sendEmail } from '~/lib/services/send-email.server'
import {
  getErrorForRecaptcha,
  handleFormSubmission,
} from '~/lib/utils/actions.server'
import type { ValidationTranslationKey } from '~/types'

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
    name?: ValidationTranslationKey
    email?: ValidationTranslationKey
    message?: ValidationTranslationKey
    recaptchaResponse?: ValidationTranslationKey
  }
}

export const action: ActionFunction = async ({ request }) => {
  return handleFormSubmission<ActionData>({
    request,
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
