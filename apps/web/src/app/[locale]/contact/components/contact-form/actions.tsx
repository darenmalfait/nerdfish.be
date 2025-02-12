'use server'

import { resend } from '@repo/email'
import { ContactEmail } from '@repo/email/templates/contact'
import { parseError } from '@repo/observability/error'
import { verifyRecaptcha } from '@repo/recaptcha/server'
import { env } from 'env'
import { type ContactFormData, contactSchema } from './validation'

export async function submitContactForm(payload: ContactFormData) {
	const data = contactSchema.parse(payload)

	const { success, error: recaptchaError } = await verifyRecaptcha(
		payload.recaptchaResponse,
	)

	if (!success) {
		return { error: recaptchaError ?? 'Recaptcha failed' }
	}

	const {
		name,
		contact,
		textMessage: message,
		company,
		budgetRange,
		projectType,
		vatNumber,
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
					vatNumber={vatNumber}
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
