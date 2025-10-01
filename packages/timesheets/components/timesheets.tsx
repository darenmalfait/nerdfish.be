'use client'

import { isSameDay, TZDate } from '@repo/calendar/utils'
import { useMemo } from 'react'
import { useTimesheetsParams } from '../hooks/use-timesheets-params'
import {
	TimesheetsProvider,
	useTimesheets,
} from '../providers/timesheets-provider'
import { type TimesheetsData, type TimesheetsRecord } from '../schemas'
import { TIMEZONE, useCalendarDates } from '../utils'
import { TimesheetsCalendar } from './timesheets-calendar'
import { TimesheetsEventsSheet } from './timesheets-events-sheet'
import { TimesheetsMonthSelect } from './timesheets-month-select'
import { TimesheetsPrint } from './timesheets-print'
import { TimesheetsToolbar } from './timesheets-toolbar'

function TimesheetsContent() {
	const { timesheets } = useTimesheets()
	const { date } = useTimesheetsParams()
	const { calendarDays } = useCalendarDates(new TZDate(date, TIMEZONE))

	const filteredTimesheets = useMemo<TimesheetsData>(() => {
		// only this month
		return Object.fromEntries(
			Object.entries(timesheets).filter(([key]) => {
				return calendarDays.some((day) => {
					return isSameDay(new TZDate(key, TIMEZONE), day)
				})
			}),
		)
	}, [timesheets, calendarDays])

	const timeEntries = useMemo<TimesheetsRecord[]>(() => {
		// Only include entries from the actual month, not calendar padding days
		const currentMonth = new TZDate(date, TIMEZONE).getMonth()
		return Object.entries(timesheets)
			.filter(([key]) => {
				const entryDate = new TZDate(key, TIMEZONE)
				return entryDate.getMonth() === currentMonth
			})
			.flatMap(([, records]) => records)
	}, [timesheets, date])

	return (
		<>
			<div className="gap-md mb-lg container flex flex-col print:hidden">
				<div className="flex items-center justify-between">
					<TimesheetsMonthSelect />
				</div>

				<TimesheetsCalendar timesheets={filteredTimesheets} />
				<TimesheetsEventsSheet />
			</div>

			<TimesheetsPrint timeEntries={timeEntries} />
			<TimesheetsToolbar />
		</>
	)
}

export function Timesheets() {
	return (
		<TimesheetsProvider>
			<TimesheetsContent />
		</TimesheetsProvider>
	)
}
