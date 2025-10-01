import { z } from 'zod'
import { timesheetsRecordFormSchema } from './forms/timesheet-record-form/timesheets-record-form.schema'

export const timesheetsRecordSchema = timesheetsRecordFormSchema.extend({
	date: z.string(),
})

export type TimesheetsRecord = z.infer<typeof timesheetsRecordSchema>

export const timesheetsDataSchema = z.record(
	z.string(),
	z.array(timesheetsRecordSchema),
)

export type TimesheetsData = z.infer<typeof timesheetsDataSchema>
