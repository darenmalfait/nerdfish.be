import nodeCrypto from 'crypto'
import { z } from 'zod'

export function getCrypto() {
	if (typeof window !== 'undefined') return window.crypto
	return nodeCrypto
}

export const timeEntrySchema = z.object({
	id: z.string(),
	day: z.date(),
	hours: z.coerce.number(),
	project: z.string(),
})
export type TimeEntry = z.infer<typeof timeEntrySchema>

export const timesheetSchema = z.object({
	invoiceReference: z.string().optional(),
	person: z.string().optional(),
	timeEntries: z.array(timeEntrySchema).optional(),
})
export type Timesheet = z.infer<typeof timesheetSchema>
