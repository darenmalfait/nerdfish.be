import { z } from 'zod'

export const timesheetsProjectFormSchema = z.object({
	id: z.string().optional(),
	name: z.string().min(1),
	description: z.string().optional(),
	billable: z.boolean().default(true).optional(),
	rate: z.number().min(1).optional(),
	currency: z.string().default('EUR').optional(),
	status: z
		.enum(['in_progress', 'completed'])
		.default('in_progress')
		.optional(),
})

export type TimesheetsProjectFormData = z.infer<
	typeof timesheetsProjectFormSchema
>
