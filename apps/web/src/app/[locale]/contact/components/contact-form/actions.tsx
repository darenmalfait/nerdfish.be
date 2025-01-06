'use server'

import { resend } from '@repo/email'
import { ContactEmail } from '@repo/email/templates/contact'
import { parseError } from '@repo/observability/error'
import { env } from 'env'
import { type ContactFormData, contactSchema } from './validation'

export async function submitContactForm(payload: ContactFormData) {
	const data = contactSchema.parse(payload)

	if (env.RECAPTCHA_SECRETKEY) {
		if (!payload.recaptchaResponse) return { error: 'Recaptcha is required' }

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
	}

	const {
		name,
		contact,
		textMessage: message,
		company,
		budgetRange,
		projectType,
	} = data

	try {
		if (env.SKIP_EMAILS || !env.EMAIL_FROM) return { success: true }

		await resend.emails.send({
			from: env.EMAIL_FROM,
			to: env.EMAIL_FROM,
			subject: 'Contact form submission',
			replyTo: `${name} <${contact.email}>`,
			react: (
				<ContactEmail
					name={name}
					email={contact.email}
					message={message}
					company={company}
					budgetRange={budgetRange}
					projectType={projectType}
					phone={contact.phone}
				/>
			),
		})

		return {
			success: true,
		}
	} catch (error) {
		const errorMessage = parseError(error)

		return { error: errorMessage }
	}
}
