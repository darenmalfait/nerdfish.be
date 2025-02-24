import { z } from 'zod'
import { timesheetsProjectFormSchema } from './forms/timesheets-project-form.schema'
import { timesheetsRecordFormSchema } from './forms/timesheets-record-form.schema'

export const timesheetsProjectSchema = timesheetsProjectFormSchema.extend({
	id: z.string(),
})

export type TimesheetsProject = z.infer<typeof timesheetsProjectSchema>

export const timesheetsRecordSchema = timesheetsRecordFormSchema.extend({
	date: z.string(),
})

export type TimesheetsRecord = z.infer<typeof timesheetsRecordSchema>

export const timesheetsDataSchema = z.record(
	z.string(),
	z.array(timesheetsRecordSchema),
)

export type TimesheetsData = z.infer<typeof timesheetsDataSchema>
