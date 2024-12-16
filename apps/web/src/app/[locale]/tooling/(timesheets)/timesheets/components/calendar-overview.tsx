import { Calendar } from '@repo/design-system/components/ui'
import * as React from 'react'
import { useTimesheet } from '../timesheet-provider'
import { getCrypto } from '../utils'

export function CalendarOverview() {
	const { timesheet, setTimesheet } = useTimesheet()

	function onDayClick(day: Date) {
		const existingEntry = timesheet.timeEntries?.find(
			(entry) => entry.day.toDateString() === day.toDateString(),
		)

		const updatedTimeEntries = existingEntry
			? timesheet.timeEntries?.filter(
					(entry) => entry.day.toDateString() !== day.toDateString(),
				)
			: [
					...(timesheet.timeEntries ?? []),
					{ day, hours: 8, project: '', id: getCrypto().randomUUID() },
				]

		setTimesheet({
			timeEntries: updatedTimeEntries,
		})
	}

	return (
		<Calendar
			today={undefined}
			selected={timesheet.timeEntries?.map((entry) => entry.day)}
			onDayClick={onDayClick}
			classNames={{
				row: 'flex gap-xs mb-xs',
			}}
		/>
	)
}
