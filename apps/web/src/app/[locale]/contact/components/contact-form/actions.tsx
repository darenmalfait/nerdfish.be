'use server'

import { resend } from '@nerdfish-website/email'
import { ContactEmail } from '@nerdfish-website/email/templates/contact'
import { env } from '@nerdfish-website/env'
import { parseError } from '@nerdfish-website/observability/error'
import type * as React from 'react'
import { contactSchema, type ContactFormData } from './validation'

export async function submitContactForm(payload: ContactFormData) {
	const data = contactSchema.parse(payload)

	if (!payload.recaptchaResponse) throw new Error('Recaptcha is required')

	const recaptchaUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${env.RECAPTCHA_SECRETKEY}&response=${payload.recaptchaResponse}`

	const recaptchaRes = await fetch(recaptchaUrl, { method: 'POST' })

	if (!recaptchaRes.ok) {
		console.error(recaptchaRes)

		return { error: 'Recaptcha failed' }
	}

	const recaptchaJson = await recaptchaRes.json()

	if (!recaptchaJson.success) {
		console.error(recaptchaJson)

		return { error: 'Recaptcha failed' }
	}

	const { name, email, textMessage: message } = data

	try {
		if (env.SKIP_EMAILS ?? !env.NERDFISH_SMTP) return { success: true }

		await resend.emails.send({
			from: env.NERDFISH_SMTP,
			to: env.NERDFISH_SMTP,
			subject: 'Contact form submission',
			replyTo: `${name} <${email}>`,
			react: <ContactEmail name={name} email={email} message={message} />,
		})

		return {
			success: true,
		}
	} catch (error) {
		const errorMessage = parseError(error)

		return { error: errorMessage }
	}
}
