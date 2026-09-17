'use server'

import { resend } from '@repo/email'
import { ContactEmail } from '@repo/email/templates/contact'
import { type ActionResponse, actionResponseSchema } from '@repo/lib/utils/form'
import { parseError } from '@repo/observability/error'
import { verifyRecaptcha } from '@repo/recaptcha/server'
import { env } from 'env'
import { createSafeActionClient } from 'next-safe-action'
import { contactFormSchema } from './contact-form.schema'

export const submitContactFormAction = createSafeActionClient()
	.inputSchema(contactFormSchema)
	.outputSchema(actionResponseSchema)
	.action(async ({ parsedInput }): Promise<ActionResponse<void>> => {
		if (env.SKIP_EMAILS || !env.EMAIL_FROM) {
			return { success: true }
		}

		const { success, error: recaptchaError } = await verifyRecaptcha(
			parsedInput.recaptchaResponse,
		)

		if (!success) {
			return { success: false, error: recaptchaError ?? 'Recaptcha failed' }
		}

		const {
			name,
			contact,
			textMessage: message,
			company,
			budgetRange,
			projectType,
			vatNumber,
		} = parsedInput

		try {
			const { error: sendError } = await resend.emails.send({
				from: env.EMAIL_FROM,
				to: env.EMAIL_FROM,
				subject: 'Contact form submission',
				replyTo: contact.email ? `${name} <${contact.email}>` : undefined,
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

			if (sendError) {
				return { success: false, error: parseError(sendError) }
			}

			return { success: true }
		} catch (error) {
			return { success: false, error: parseError(error) }
		}
	})
