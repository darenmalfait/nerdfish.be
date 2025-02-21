import nodeCrypto from 'crypto'
import { eachDayOfInterval, format, parseISO } from '@repo/calendar/utils'
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

export function getDates(
	selectedDate: string | null,
	sortedRange?: string[] | null,
): string[] {
	if (selectedDate) return [selectedDate]

	if (sortedRange?.length === 2) {
		const [start, end] = sortedRange
		if (start && end) {
			return eachDayOfInterval({
				start: parseISO(start),
				end: parseISO(end),
			}).map((date) => format(date, 'yyyy-MM-dd'))
		}
	}
	return []
}
