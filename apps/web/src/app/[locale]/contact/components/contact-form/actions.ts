'use server'

import {
	ContactEmail as contactEmail,
	renderAsync,
} from '@nerdfish-website/emails/emails'
import type * as React from 'react'
import { Resend } from 'resend'
import { contactSchema, type ContactFormData } from './validation'

const resend = new Resend(process.env.RESEND_API_KEY)

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
		contactEmail({ message, from }) as React.ReactElement,
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

export async function submitContactForm(payload: ContactFormData) {
	const data = contactSchema.parse(payload)

	if (!payload.recaptchaResponse) throw new Error('Recaptcha is required')

	const recaptchaUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRETKEY}&response=${payload.recaptchaResponse}`

	const recaptchaRes = await fetch(recaptchaUrl, { method: 'POST' })

	if (!recaptchaRes.ok) {
		console.error(recaptchaRes)

		throw new Error('Recaptcha failed')
	}

	const recaptchaJson = await recaptchaRes.json()

	if (!recaptchaJson.success) {
		console.error(recaptchaJson)

		throw new Error('Recaptcha failed')
	}

	const { name, email, textMessage: message } = data

	await sendContactEmail({
		from: `${name} <${email}>`,
		message,
	})

	return {
		success: true,
	}
}
