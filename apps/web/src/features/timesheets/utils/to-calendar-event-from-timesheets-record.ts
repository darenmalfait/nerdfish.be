import { type CalendarEvent } from '@repo/calendar/schemas'
import { NEW_EVENT_ID, parseISO } from '@repo/calendar/utils'

import { type TimesheetsRecord } from '../types/timesheets'

export function toCalendarEventFromTimesheetsRecord(
	event: TimesheetsRecord,
): CalendarEvent {
	return {
		...event,
		id: event.id ?? NEW_EVENT_ID,
		start: parseISO(event.start),
		end: parseISO(event.end),
		project: event.project,
		description: event.description,
	}
}
