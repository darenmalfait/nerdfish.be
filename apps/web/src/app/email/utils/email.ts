import {
  ContactEmail as contactEmail,
  renderAsync,
} from '@nerdfish-website/emails/emails'
import {Resend} from 'resend'

import {env} from '~/env.mjs'

const resend = new Resend(env.RESEND_API_KEY)

export async function sendContactEmail({
  message,
  from,
}: {
  message: string
  from: string
}) {
  if (process.env.SKIP_EMAILS ?? !process.env.NERDFISH_SMTP) return

  // https://github.com/resendlabs/resend-node/issues/256
  const html = await renderAsync(
    contactEmail({message, from}) as React.ReactElement,
  )

  const data = await resend.emails.send({
    from: process.env.NERDFISH_SMTP,
    reply_to: from,
    to: [process.env.NERDFISH_SMTP],
    subject: 'Email from contact form nerdfish.be',
    html,
  })

  return data
}
