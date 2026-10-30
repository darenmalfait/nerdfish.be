import { z } from 'zod'

export const timesheetsRecordSchema = z.object({
	id: z.string().optional(),
	date: z.string(),
	duration: z.number().min(1),
	project: z.string().optional(),
	description: z.string().optional(),
	start: z.string(),
	end: z.string(),
})

export type TimesheetsRecord = z.infer<typeof timesheetsRecordSchema>

export const timesheetsDataSchema = z.record(
	z.string(),
	z.array(timesheetsRecordSchema),
)

export type TimesheetsData = z.infer<typeof timesheetsDataSchema>
