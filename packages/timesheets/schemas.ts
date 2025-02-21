import { z } from 'zod'
import { timesheetsRecordFormSchema } from './forms/timesheets-record-form.schema'

export const timesheetRecordSchema = timesheetsRecordFormSchema.extend({
	date: z.string(),
})

export type TimesheetRecord = z.infer<typeof timesheetRecordSchema>
