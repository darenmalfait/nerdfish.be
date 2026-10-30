import {
	TZDate,
	startOfMonth,
	endOfMonth,
	startOfWeek,
	endOfWeek,
	eachDayOfInterval,
} from '@repo/calendar/utils'

export function calendarDates(currentDate: TZDate) {
	const weekStartsOn = 1

	const monthStart = startOfMonth(currentDate)
	const monthEnd = endOfMonth(currentDate)
	const calendarStart = startOfWeek(monthStart, {
		weekStartsOn,
	})
	const calendarEnd = endOfWeek(monthEnd, {
		weekStartsOn,
	})
	const calendarDays = eachDayOfInterval({
		start: calendarStart,
		end: calendarEnd,
	}).map((date) => new TZDate(date, 'UTC'))
	const firstWeek = eachDayOfInterval({
		start: calendarStart,
		end: endOfWeek(calendarStart, { weekStartsOn }),
	}).map((date) => new TZDate(date, 'UTC'))

	return {
		monthStart,
		monthEnd,
		calendarStart,
		calendarEnd,
		calendarDays,
		firstWeek,
	}
}
