import { z } from 'zod'
import { timesheetsProjectFormSchema } from './forms/timesheet-project-form/timesheets-project-form.schema'
import { timesheetsRecordFormSchema } from './forms/timesheet-record-form/timesheets-record-form.schema'

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
