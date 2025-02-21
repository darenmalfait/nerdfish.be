'use client'

import { CalendarDay } from '@repo/calendar/components/calendar-day'
import { type CalendarEvent } from '@repo/calendar/schemas'
import {
	differenceInSeconds,
	format,
	formatISO,
	NEW_EVENT_ID,
	parseISO,
	TZDate,
} from '@repo/calendar/utils'
import { TimesheetsCalendar } from '@repo/timesheets/components/timesheets-calendar'
import { TimesheetsRecordForm } from '@repo/timesheets/forms/timesheets-record-form'
import { type TimesheetsRecordFormData } from '@repo/timesheets/forms/timesheets-record-form.schema'
import { useTimesheetsParams } from '@repo/timesheets/hooks/use-timesheets-params'
import {
	type TimesheetsData,
	type TimesheetRecord,
} from '@repo/timesheets/schemas'
import { TIMEZONE, transformTimesheetsRecord } from '@repo/timesheets/utils'
import * as React from 'react'
import { getCrypto, getDates } from '../utils'

// TODO: Remove this
export function CalendarOverview() {
	const [data, setData] = React.useState<TimesheetsData>({})
	const { selectedDate, range } = useTimesheetsParams()

	const [selectedEvent, setSelectedEvent] = React.useState<TimesheetRecord>()

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

	const handleCreateEvent = (values: TimesheetsRecordFormData) => {
		const sortedRange = range?.sort((a, b) => a.localeCompare(b))

		const dates = getDates(selectedDate, sortedRange)
		const baseDate =
			dates[0] ?? selectedDate ?? format(new Date(), 'yyyy-MM-dd')

		const startDate = parseISO(`${baseDate}T${values.start}`)
		const endDate = parseISO(`${baseDate}T${values.end}`)

		const newEvent = {
			id: getCrypto().randomUUID(),
			start: startDate.toISOString(),
			end: endDate.toISOString(),
			project: values.project,
			description: values.description ?? '',
			duration: Math.max(0, differenceInSeconds(endDate, startDate)),
		}

		const entries = dates.map((date) => ({
			...newEvent,
			date: new TZDate(date, TIMEZONE).toISOString(),
			start: new TZDate(newEvent.start, TIMEZONE).toISOString(),
			end: new TZDate(newEvent.end, TIMEZONE).toISOString(),
		}))

		setData({
			...data,
			...entries.reduce<Record<string, TimesheetRecord[]>>((acc, entry) => {
				const key = formatISO(new Date(entry.date), { representation: 'date' })
				acc[key] = [
					...(data[key]?.filter((e) => e.id && e.id !== NEW_EVENT_ID) ?? []),
					...(acc[key]?.filter((e) => e.id && e.id !== NEW_EVENT_ID) ?? []),
					entry,
				]
				return acc
			}, {}),
		})
	}

	const handleSubmit = (values: TimesheetsRecordFormData) => {
		if (values.id) return

		handleCreateEvent(values)
	}

	return (
		<div className="gap-sm flex flex-col">
			<TimesheetsCalendar data={data} />
			<CalendarDay onEventSelect={onEventSelect} />
			<TimesheetsRecordForm
				onSubmit={handleSubmit}
				defaultValues={
					selectedEvent
						? transformTimesheetsRecord(selectedEvent, selectedDate)
						: undefined
				}
			/>
		</div>
	)
}
