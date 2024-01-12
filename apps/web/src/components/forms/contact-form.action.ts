'use server'

import {contactFormData, contactSchema} from '@nerdfish-website/lib/validations'

import {env} from '~/env.mjs'
import {sendContactEmail} from '~/lib/utils/email'

export async function submitContactForm(payload: contactFormData) {
  const data = contactSchema.parse(payload)

  if (!payload.recaptchaResponse) throw new Error('Recaptcha is required')

  const recaptchaUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${env.RECAPTCHA_SECRETKEY}&response=${payload.recaptchaResponse}`

  const recaptchaRes = await fetch(recaptchaUrl, {method: 'POST'})

  if (!recaptchaRes.ok) {
    console.error(recaptchaRes)

    throw new Error('Recaptcha failed')
  }

  const recaptchaJson = await recaptchaRes.json()

  if (!recaptchaJson.success) {
    console.error(recaptchaJson)

    throw new Error('Recaptcha failed')
  }

  const {name, email, textMessage, project} = data

  await sendContactEmail({
    from: `${name} <${email}>`,
    message: `${project}: ${textMessage}`,
  })

  return {
    success: true,
  }
}
