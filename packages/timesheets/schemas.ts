import { z } from 'zod'
import { timesheetsRecordFormSchema } from './forms/timesheets-record-form.schema'

export const timesheetRecordSchema = timesheetsRecordFormSchema.extend({
	date: z.string(),
})

export type TimesheetRecord = z.infer<typeof timesheetRecordSchema>

export const timesheetsDataSchema = z.record(
	z.string(),
	z.array(timesheetRecordSchema),
)

export type TimesheetsData = z.infer<typeof timesheetsDataSchema>
