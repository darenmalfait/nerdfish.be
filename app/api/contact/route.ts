import {z} from 'zod'

import {env} from '~/env.mjs'
import {sendEmail} from '~/lib/services/email.server'
import {contactFormSchema} from '~/lib/validations/contact'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const payload = contactFormSchema.parse(body)

    if (!payload.recaptchaResponse) {
      return new Response('Recaptcha is required', {status: 422})
    }

    const recaptchaUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${env.RECAPTCHA_SECRETKEY}&response=${payload.recaptchaResponse}`

    const recaptchaRes = await fetch(recaptchaUrl, {method: 'POST'})

    if (!recaptchaRes.ok) {
      console.error(recaptchaRes)
      return new Response('Recaptcha failed', {status: 422})
    }

    const recaptchaJson = await recaptchaRes.json()

    if (!recaptchaJson.success) {
      console.error(recaptchaJson)
      return new Response('Recaptcha failed', {status: 422})
    }

    const {name, email, textMessage, project} = payload

    const html = `
    name: ${name}
    email: ${email}
    projectType: ${project}
    message: ${textMessage}
    `

    await sendEmail({
      to: `"Daren Malfait" <daren@nerdfish.be>`,
      from: 'daren@nerdfish.be',
      subject: 'Form submission from nerdfish.be',
      html,
      replyTo: `${name} <${email}>`,
    })

    return new Response(null, {status: 200})
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), {status: 422})
    }

    console.error('error', error)

    return new Response(null, {status: 500})
  }
}