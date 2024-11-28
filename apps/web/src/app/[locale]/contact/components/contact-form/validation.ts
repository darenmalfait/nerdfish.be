import { optionalField } from '@repo/lib/utils/validation'
import * as z from 'zod'

export const projectTypes = [
	'webdesign',
	'freelance',
	'print',
	'other',
] as const

const phoneRegex = new RegExp(
	/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
)

export const contactSchema = z.object({
	name: z
		.string()
		.min(2, 'Your name seems a bit short.')
		.max(32, 'Your name seems a bit long.'),
	company: optionalField(
		z
			.string()
			.min(2, 'Your company name seems a bit short.')
			.max(32, 'Your company name seems a bit long.')
	),
	contact: z
		.object({
			email: optionalField(
				z.string().email('Please enter a valid email address.')
			),
			phone: optionalField(
				z.string().regex(phoneRegex, 'This is not a valid phone number.')
			),
		})
		.partial()
		.superRefine((data, ctx) => {
			if (!data.email?.length && !data.phone?.length) {
				ctx.addIssue({
					path: ['email'],
					code: z.ZodIssueCode.custom,
					message: 'Either email or phone should be filled in.',
				})
			}
		}),
	textMessage: z
		.string()
		.min(10, 'I hope that your message is a bit longer than that.')
		.max(
			512,
			'I like that you have a lot to say, but please keep it under 512 characters.'
		),
	projectType: z.array(z.enum(projectTypes)),
	budgetRange: z.array(z.number()).optional(),
	recaptchaResponse: z.string().optional(),
})

export type ContactFormData = z.infer<typeof contactSchema>
