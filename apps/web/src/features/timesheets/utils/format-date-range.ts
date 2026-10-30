import { type TZDate, format } from '@repo/calendar/utils'

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
		return `${format(startDate, 'MMM')} ${formatDay(startDate)} - ${formatDay(endDate)}`
	}

	return `${formatFullDate(startDate)} - ${formatFullDate(endDate)}`
}
