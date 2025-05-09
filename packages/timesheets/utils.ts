import { type CalendarEvent } from '@repo/calendar/schemas'
import {
	getTimeFromDate,
	NEW_EVENT_ID,
	type TZDate,
	format,
	parseISO,
	addSeconds,
	differenceInSeconds,
} from '@repo/calendar/utils'
import { type TimesheetsRecordFormData } from './forms/timesheet-record-form/timesheets-record-form.schema'
import { type TimesheetsProject, type TimesheetsRecord } from './schemas'

export const TIMEZONE = 'Europe/Brussels'

export function sortDates(dates: string[]) {
	return dates.sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
}

export function getTimesheetsDates(
	range: string[] | null,
	selectedDate: string | null,
): Date[] {
	if (range) {
		return sortDates(range).map((dateString) => new Date(dateString))
	}

	if (selectedDate) {
		return [new Date(selectedDate)]
	}

	return [new Date()]
}

export function formatDateRange(dates: TZDate[]): string {
	if (!dates.length) return ''

	const formatFullDate = (date: TZDate) => format(date, 'MMM d')
	const formatDay = (date: TZDate) => format(date, 'd')

	if (dates.length === 1 || dates[0]?.getTime() === dates[1]?.getTime()) {
		return formatFullDate(dates[0] as TZDate)
	}

	const startDate = dates[0]
	const endDate = dates[1]

	if (!startDate || !endDate) return ''

	if (startDate.getMonth() === endDate.getMonth()) {
		// Same month
		return `${format(startDate, 'MMM')} ${formatDay(startDate)} - ${formatDay(endDate)}`
	}

	// Different months
	return `${formatFullDate(startDate)} - ${formatFullDate(endDate)}`
}

export function transformTimesheetsRecordToFormData(
	event: TimesheetsRecord,
	selectedDate: string | null,
): TimesheetsRecordFormData {
	const start = event.start
		? parseISO(event.start)
		: parseISO(`${event.date || selectedDate}T09:00:00`)
	const end = event.end
		? parseISO(event.end)
		: addSeconds(start, event.duration || 0)

	return {
		...event,
		id: event.id ?? NEW_EVENT_ID,
		start: getTimeFromDate(start),
		end: getTimeFromDate(end),
		projectId: event.projectId,
		description: event.description,
	}
}

export function transformTimesheetsRecordToCalendarEvent(
	event: TimesheetsRecord,
	project?: TimesheetsProject | undefined,
): CalendarEvent {
	return {
		...event,
		id: event.id ?? NEW_EVENT_ID,
		start: parseISO(event.start),
		end: parseISO(event.end),
		project,
		description: event.description,
	}
}

export function transformCalendarEventToTimesheetsRecord(
	event: CalendarEvent,
): TimesheetsRecord {
	return {
		...event,
		id: event.id,
		projectId: event.project?.id,
		duration: Math.max(0, differenceInSeconds(event.end, event.start)),
		date: new Date(event.start).toISOString(),
		start: event.start.toISOString(),
		end: event.end.toISOString(),
	}
}
