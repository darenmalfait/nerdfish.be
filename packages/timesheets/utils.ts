import { type TZDate } from '@date-fns/tz'
import { format } from 'date-fns'

export const TIMEZONE = 'Europe/Brussels'

export const NEW_EVENT_ID = 'new-event'

export function sortDates(dates: string[]) {
	return dates.sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
}

export function getTrackerDates(
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
