import { z } from 'zod'

export const timesheetsRecordFormSchema = z.object({
	id: z.string().optional(),
	duration: z.number().min(1),
	project: z.string().optional(),
	description: z.string().optional(),
	start: z.string(),
	end: z.string(),
})

export type TimesheetsRecordFormData = z.infer<
	typeof timesheetsRecordFormSchema
>
