'use client'

import { CalendarDay } from '@repo/calendar/components/calendar-day'
import { type CalendarEvent } from '@repo/calendar/schemas'
import { TimesheetsRecordForm } from '@repo/timesheets/forms/timesheets-record-form'
import { useTimesheetsParams } from '@repo/timesheets/hooks/use-timesheets-params'
import { type TimesheetRecord } from '@repo/timesheets/schemas'
import { transformTimesheetsRecord } from '@repo/timesheets/utils'
import * as React from 'react'

// TODO: Remove this
export function CalendarOverview() {
	const { selectedDate } = useTimesheetsParams()

	const [selectedEvent, setSelectedEvent] = React.useState<TimesheetRecord>()

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

	function onEventSelect(event?: CalendarEvent | null) {
		if (!event) return setSelectedEvent(undefined)

		setSelectedEvent({
			date: selectedDate ?? new Date().toISOString(),
			duration: 0,
			project: event.title,
			start: event.start.toISOString(),
			end: event.end.toISOString(),
			id: event.id,
		})
	}

	return (
		<div className="gap-sm flex flex-col">
			<CalendarDay onEventSelect={onEventSelect} />
			<TimesheetsRecordForm
				defaultValues={
					selectedEvent
						? transformTimesheetsRecord(selectedEvent, selectedDate)
						: undefined
				}
			/>
		</div>
	)
}
