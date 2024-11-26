import { optionalField } from '@nerdfish-website/lib/utils'
import * as z from 'zod'

export const projectTypes = [
	'webdesign',
	'freelance',
	'print',
	'other',
] as const

const phoneRegex = new RegExp(
	/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/,
)

export const contactSchema = z
	.object({
		name: z
			.string()
			.min(2, 'Your name seems a bit short.')
			.max(32, 'Your name seems a bit long.'),
		company: optionalField(
			z
				.string()
				.min(2, 'Your company name seems a bit short.')
				.max(32, 'Your company name seems a bit long.'),
		),
		email: optionalField(
			z.string().email('Please enter a valid email address.'),
		),
		phone: optionalField(z.string().regex(phoneRegex, 'Invalid Number!')),
		textMessage: z
			.string()
			.min(10, 'I hope that your message is a bit longer than that.')
			.max(
				512,
				'I like that you have a lot to say, but please keep it under 512 characters.',
			),
		projectType: z.array(z.enum(projectTypes)),
		budgetRange: z.array(z.number()).optional(),
		recaptchaResponse: z.string().optional(),
	})
	.superRefine(({ phone, email }, ctx) => {
		if (email === undefined && phone === undefined) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				path: ['email'],
				message: 'Please provide either an email or phone number.',
			})
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				path: ['phone'],
				message: 'Please provide either an email or phone number.',
			})
		}
	})

export type ContactFormData = z.infer<typeof contactSchema>
