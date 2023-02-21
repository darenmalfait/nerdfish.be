import sendgrid from '@sendgrid/mail'

let sendgridKey = ''

if (process.env.SENDGRID_API_KEY) {
  sendgridKey = process.env.SENDGRID_API_KEY
} else if (process.env.NODE_ENV === 'production') {
  throw new Error('SENDGRID_API_KEY is required')
}

type MailMessage = {
  to: string
  from: string
  subject: string
  html: string
  replyTo?: string
}

async function sendEmail(msg: MailMessage) {
  sendgrid.setApiKey(sendgridKey)

  await sendgrid.send(msg)
}

export {sendEmail}
