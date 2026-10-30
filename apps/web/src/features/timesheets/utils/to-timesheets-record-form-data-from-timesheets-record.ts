import {
	getTimeFromDate,
	NEW_EVENT_ID,
	parseISO,
	addSeconds,
} from '@repo/calendar/utils'

import { type TimesheetsRecordFormData } from '../forms/timesheets-record-form.schema'
import { type TimesheetsRecord } from '../types/timesheets'

export function toTimesheetsRecordFormDataFromTimesheetsRecord(
	event: TimesheetsRecord,
): TimesheetsRecordFormData {
	const start = event.start
		? parseISO(event.start)
		: parseISO(`${event.date}T09:00:00`)
	const end = event.end
		? parseISO(event.end)
		: addSeconds(start, event.duration || 0)

	return {
		...event,
		id: event.id ?? NEW_EVENT_ID,
		start: getTimeFromDate(start),
		end: getTimeFromDate(end),
		project: event.project,
		description: event.description,
	}
}
