import { formatISO, parseISO, differenceInSeconds } from '@repo/calendar/utils'

import { type TimesheetsRecordFormData } from '../forms/timesheets-record-form.schema'
import { type TimesheetsRecord } from '../types/timesheets'

export function toTimesheetsRecordFromTimesheetsRecordFormData({
	date,
	start,
	end,
	id,
	project,
	description,
}: TimesheetsRecordFormData &
	Pick<TimesheetsRecord, 'date'>): TimesheetsRecord {
	const baseDate = formatISO(parseISO(date), {
		representation: 'date',
	})
	const startDate = parseISO(`${baseDate}T${start}`)
	const endDate = parseISO(`${baseDate}T${end}`)

	return {
		id,
		date,
		project,
		description,
		start: startDate.toISOString(),
		end: endDate.toISOString(),
		duration: Math.max(0, differenceInSeconds(endDate, startDate)),
	}
}
