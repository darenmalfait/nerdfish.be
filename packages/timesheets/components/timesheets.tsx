'use client'

import {
	differenceInSeconds,
	eachDayOfInterval,
	formatISO,
	format,
	parseISO,
	TZDate,
	NEW_EVENT_ID,
} from '@repo/calendar/utils'
import { useLocalStorage } from '@repo/lib/hooks/use-local-storage'
import { getCrypto } from '@repo/lib/utils/misc'
import * as React from 'react'
import { type TimesheetRecord, type TimesheetsData } from '../schemas'
import { TIMEZONE } from '../utils'
import { TimesheetsCalendar } from './timesheets-calendar'
import { TimesheetsEventsSheet } from './timesheets-events-sheet'
import { TimesheetsMonthSelect } from './timesheets-month-select'
import {
	type TimesheetsScheduleDeleteEvent,
	type TimesheetsScheduleCreateEvent,
	type TimesheetsScheduleUpdateEvent,
} from './timesheets-schedule'

function getDates(
	selectedDate: string | null,
	sortedRange?: string[] | null,
): string[] {
	if (selectedDate) return [selectedDate]

	if (sortedRange?.length === 2) {
		const [start, end] = sortedRange
		if (start && end) {
			return eachDayOfInterval({
				start: parseISO(start),
				end: parseISO(end),
			}).map((date) => format(date, 'yyyy-MM-dd'))
		}
	}
	return []
}

export function Timesheets() {
	const [data, setData] = useLocalStorage<TimesheetsData>('timesheets', {})

	const handleCreateEvent: TimesheetsScheduleCreateEvent = React.useCallback(
		async ({ values, selectedDate, range }) => {
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
					// key is date xxxx-xx-xx
					const key = formatISO(new Date(entry.date), {
						representation: 'date',
					})

					// append current data and new entry
					acc[key] = [
						...(data[key]?.filter((e) => e.id && e.id !== NEW_EVENT_ID) ?? []),
						...(acc[key]?.filter((e) => e.id && e.id !== NEW_EVENT_ID) ?? []),
						entry,
					]
					return acc
				}, {}),
			})

			return { success: true }
		},
		[data, setData],
	)

	const handleDeleteEvent: TimesheetsScheduleDeleteEvent = React.useCallback(
		async (id, selectedDate) => {
			if (!selectedDate) return { success: false }

			const formattedDate = formatISO(selectedDate, {
				representation: 'date',
			})

			if (!data[formattedDate]) return { success: false }

			setData({
				...data,
				[formattedDate]: data[formattedDate].filter((e) => e.id !== id),
			})

			return { success: true }
		},
		[data, setData],
	)

	const handleUpdateEvent: TimesheetsScheduleUpdateEvent = React.useCallback(
		async (id, values, selectedDate) => {
			if (!selectedDate) return { success: false }

			const formattedDate = formatISO(selectedDate, {
				representation: 'date',
			})

			if (!data[formattedDate]) return { success: false }

			const startDate = parseISO(`${selectedDate}T${values.start}`)
			const endDate = parseISO(`${selectedDate}T${values.end}`)

			const updatedEvent: TimesheetRecord = {
				...values,
				date: new TZDate(selectedDate, TIMEZONE).toISOString(),
				start: new TZDate(startDate.toISOString(), TIMEZONE).toISOString(),
				end: new TZDate(endDate.toISOString(), TIMEZONE).toISOString(),
				duration: Math.max(0, differenceInSeconds(endDate, startDate)),
			}

			setData({
				...data,
				[formattedDate]: [
					...data[formattedDate].filter((e) => e.id !== id),
					updatedEvent,
				],
			})

			return { success: true }
		},
		[data, setData],
	)

	return (
		<div className="gap-md flex flex-col">
			<div className="flex items-center justify-end">
				<TimesheetsMonthSelect />
			</div>

			<TimesheetsCalendar data={data} />
			<TimesheetsEventsSheet
				data={data}
				onCreateEvent={handleCreateEvent}
				onDeleteEvent={handleDeleteEvent}
				onUpdateEvent={handleUpdateEvent}
			/>
		</div>
	)
}
