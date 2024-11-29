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
	name: z.string().min(2).max(32),
	company: optionalField(z.string().min(2).max(32)),
	contact: z
		.object({
			email: optionalField(
				z
					.string()
					.email()
					.refine(() => false, {
						params: {
							i18n: 'validEmail',
						},
					})
			),
			phone: optionalField(
				z
					.string()
					.regex(phoneRegex)
					.refine(() => false, {
						params: {
							i18n: 'validPhoneNumber',
						},
					})
			),
		})
		.partial()
		.superRefine((data, ctx) => {
			if (!data.email?.length && !data.phone?.length) {
				ctx.addIssue({
					path: ['email'],
					code: z.ZodIssueCode.custom,
					params: {
						i18n: 'phoneOrEmailRequired',
					},
				})
			}
		}),
	textMessage: z
		.string()
		.min(10)
		.max(512)
		.refine(() => false, {
			params: {
				i18n: 'messageNotWithinRange',
			},
		}),
	projectType: z.array(z.enum(projectTypes)),
	budgetRange: z.array(z.number()).optional(),
	recaptchaResponse: z.string().optional(),
})

export type ContactFormData = z.infer<typeof contactSchema>
