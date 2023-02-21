import * as React from 'react'
import {ActionArgs, json} from '@remix-run/node'

import {sendEmail} from '~/lib/services/send-email.server'
import {
  getErrorForRecaptcha,
  handleFormSubmission,
} from '~/lib/utils/actions.server'

function getErrorForName(name: string | null): string | null {
  if (!name) return 'Please enter your name.'
  if (name.length > 60) return 'Please enter a shorter name.'

  return null
}

function getErrorForEmail(email: string | null): string | null {
  if (!email) return 'Please enter your email address.'
  if (!/^.+@.+\..+$/.test(email)) return 'Please enter a valid email address.'

  return null
}

function getErrorForMessage(message: string | null): string | null {
  if (!message) return 'Please enter a message.'
  if (message.length <= 40) return 'Please enter a longer message.'
  if (message.length > 1001) return 'Please enter a shorter message.'

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

export async function action({request}: ActionArgs) {
  return handleFormSubmission<ActionData>({
    request,
    validators: {
      name: getErrorForName,
      email: getErrorForEmail,
      message: getErrorForMessage,
      recaptchaResponse: getErrorForRecaptcha,
    },
    handleFormValues: async fields => {
      const {name, email, message, projectType} = fields

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

export default function SubmitBasicForm() {
  return <div>Oops... You should not see this.</div>
}
