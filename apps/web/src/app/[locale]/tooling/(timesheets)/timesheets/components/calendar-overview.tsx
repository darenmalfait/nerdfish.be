import { CalendarDay } from '@repo/calendar/components/calendar-day'
import * as React from 'react'

// TODO: Remove this
export function CalendarOverview() {
	// 	const { timesheet, setTimesheet } = useTimesheet()

	// 	function onDayClick(day: Date) {
	// 		const existingEntry = timesheet.timeEntries?.find(
	// 			(entry) => entry.day.toDateString() === day.toDateString(),
	// 		)

	// 		const updatedTimeEntries = existingEntry
	// 			? timesheet.timeEntries?.filter(
	// 					(entry) => entry.day.toDateString() !== day.toDateString(),
	// 				)
	// 			: [
	// 					...(timesheet.timeEntries ?? []),
	// 					{ day, hours: 8, project: '', id: getCrypto().randomUUID() },
	// 				]

	// 		setTimesheet({
	// 			timeEntries: updatedTimeEntries,
	// 		})
	// 	}

	return <CalendarDay />
}
