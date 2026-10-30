import { type CalendarEvent } from '@repo/calendar/schemas'
import { differenceInSeconds } from '@repo/calendar/utils'

import { type TimesheetsRecord } from '../types/timesheets'

export function toTimesheetsRecordFromCalendarEvent(
	event: CalendarEvent,
): TimesheetsRecord {
	return {
		...event,
		id: event.id,
		project: event.project,
		duration: Math.max(0, differenceInSeconds(event.end, event.start)),
		date: new Date(event.start).toISOString(),
		start: event.start.toISOString(),
		end: event.end.toISOString(),
	}
}
