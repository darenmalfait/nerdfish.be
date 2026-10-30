import { type z } from 'zod'

import { timesheetsRecordSchema } from '../types/timesheets'

export const timesheetsRecordFormSchema = timesheetsRecordSchema.omit({
	date: true,
})

export type TimesheetsRecordFormData = z.infer<
	typeof timesheetsRecordFormSchema
>
