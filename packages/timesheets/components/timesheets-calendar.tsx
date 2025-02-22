'use client'

import {
	addMonths,
	eachDayOfInterval,
	endOfMonth,
	endOfWeek,
	format,
	formatISO,
	isToday,
	startOfMonth,
	startOfWeek,
	subMonths,
	TZDate,
} from '@repo/calendar/utils'
import { useClickAway } from '@repo/lib/hooks/use-click-away'
import { useHotkeys } from '@repo/lib/hooks/use-hotkeys'
import { cx } from '@repo/lib/utils/base'
import * as React from 'react'
import { useTimesheetsParams } from '../hooks/use-timesheets-params'
import { type TimesheetsData, type TimesheetRecord } from '../schemas'
import { TIMEZONE } from '../utils'
import { TimesheetsCalendarEvents } from './timesheets-calendar-events'

function useCalendarDates(currentDate: TZDate) {
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

function checkIsInRange(
	date: TZDate,
	isDragging: boolean,
	localRange: [string, string | null],
	range: [string, string] | null | string[],
) {
	if (isDragging && localRange[0] && localRange[1]) {
		const start = new TZDate(localRange[0], TIMEZONE)
		const end = new TZDate(localRange[1], TIMEZONE)
		return (
			date >= new TZDate(Math.min(start.getTime(), end.getTime()), TIMEZONE) &&
			date <= new TZDate(Math.max(start.getTime(), end.getTime()), TIMEZONE)
		)
	}
	if (range?.length === 2) {
		const start = new TZDate(range[0], TIMEZONE)
		const end = new TZDate(range[1], TIMEZONE)
		return (
			date >= new TZDate(Math.min(start.getTime(), end.getTime()), TIMEZONE) &&
			date <= new TZDate(Math.max(start.getTime(), end.getTime()), TIMEZONE)
		)
	}
	return false
}

function checkIsFirstSelectedDate(
	date: TZDate,
	isDragging: boolean,
	localRange: [string, string | null],
	range: [string, string] | null | string[],
) {
	if (isDragging && localRange[0]) {
		const start = new TZDate(localRange[0], TIMEZONE)
		const end = localRange[1] ? new TZDate(localRange[1], TIMEZONE) : start
		const firstDate = new TZDate(
			Math.min(start.getTime(), end.getTime()),
			TIMEZONE,
		)
		return (
			formatISO(date, { representation: 'date' }) ===
			formatISO(firstDate, { representation: 'date' })
		)
	}
	if (!!range?.length) {
		const start = new TZDate(range[0], TIMEZONE)
		const end = new TZDate(range[1], TIMEZONE)
		const firstDate = new TZDate(
			Math.min(start.getTime(), end.getTime()),
			TIMEZONE,
		)
		return (
			formatISO(date, { representation: 'date' }) ===
			formatISO(firstDate, { representation: 'date' })
		)
	}
	return false
}

function checkIsLastSelectedDate(
	date: TZDate,
	isDragging: boolean,
	localRange: [string, string | null],
	range: [string, string] | null | string[],
) {
	if (isDragging && localRange[0] && localRange[1]) {
		const start = new TZDate(localRange[0], TIMEZONE)
		const end = new TZDate(localRange[1], TIMEZONE)
		const lastDate = new TZDate(
			Math.max(start.getTime(), end.getTime()),
			TIMEZONE,
		)
		return (
			formatISO(date, { representation: 'date' }) ===
			formatISO(lastDate, { representation: 'date' })
		)
	}
	if (range?.length === 2) {
		const start = new TZDate(range[0], TIMEZONE)
		const end = new TZDate(range[1], TIMEZONE)
		const lastDate = new TZDate(
			Math.max(start.getTime(), end.getTime()),
			TIMEZONE,
		)
		return (
			formatISO(date, { representation: 'date' }) ===
			formatISO(lastDate, { representation: 'date' })
		)
	}
	return false
}

function handleMonthChange(
	direction: number,
	currentDate: TZDate,
	setParams: (params: any) => void,
) {
	const newDate =
		direction > 0 ? addMonths(currentDate, 1) : subMonths(currentDate, 1)
	setParams({
		date: formatISO(newDate, { representation: 'date' }),
	})
}

interface TimesheetsCalendarDayProps {
	date: TZDate
	data: Record<string, TimesheetRecord[]>
	localRange: [string, string | null]
	isDragging: boolean
	handleMouseDown: (date: TZDate) => void
	handleMouseEnter: (date: TZDate) => void
	handleMouseUp: () => void
}

function TimesheetsCalendarDay({
	date,
	data,
	localRange,
	isDragging,
	handleMouseDown,
	handleMouseEnter,
	handleMouseUp,
}: TimesheetsCalendarDayProps) {
	const { date: currentDate, range, selectedDate } = useTimesheetsParams()

	const isCurrentMonth =
		date.getMonth() === new TZDate(currentDate, TIMEZONE).getMonth()
	const formattedDate = formatISO(date, { representation: 'date' })

	const isInRange = React.useCallback(
		(dte: TZDate) => checkIsInRange(dte, isDragging, localRange, range),
		[isDragging, localRange, range],
	)

	const isFirstSelectedDate = React.useCallback(
		(dte: TZDate) =>
			checkIsFirstSelectedDate(dte, isDragging, localRange, range),
		[isDragging, localRange, range],
	)

	const isLastSelectedDate = React.useCallback(
		(dte: TZDate) =>
			checkIsLastSelectedDate(dte, isDragging, localRange, range),
		[isDragging, localRange, range],
	)

	return (
		<div
			onMouseDown={() => handleMouseDown(date)}
			onMouseEnter={() => handleMouseEnter(date)}
			onMouseUp={handleMouseUp}
			className={cx(
				'relative flex aspect-square select-none space-x-2 px-3 pb-10 pt-2 text-left font-mono text-lg transition-all duration-100 md:aspect-[4/2]',
				isCurrentMonth && isToday(date)
					? 'bg-[#f0f0f0] dark:bg-[#202020]'
					: 'bg-background',
				!isCurrentMonth &&
					'bg-[repeating-linear-gradient(-60deg,#DBDBDB,#DBDBDB_1px,transparent_1px,transparent_5px)] dark:bg-[repeating-linear-gradient(-60deg,#2C2C2C,#2C2C2C_1px,transparent_1px,transparent_5px)]',
				selectedDate === formattedDate && 'ring-primary ring-1',
				isInRange(date) && 'ring-primary bg-opacity-50 ring-1',
				isFirstSelectedDate(date) && 'ring-primary bg-opacity-50 ring-1',
				isLastSelectedDate(date) && 'ring-primary bg-opacity-50 ring-1',
			)}
		>
			<div>{format(date, 'd')}</div>
			<TimesheetsCalendarEvents
				data={data[formattedDate]}
				isToday={isToday(date)}
			/>
		</div>
	)
}

interface TimesheetsCalendarProps {
	data: TimesheetsData
}

export function TimesheetsCalendar({ data }: TimesheetsCalendarProps) {
	const {
		date: currentDate,
		setParams,
		selectedDate,
		range,
	} = useTimesheetsParams()
	const { calendarDays, firstWeek } = useCalendarDates(
		new TZDate(currentDate, TIMEZONE),
	)

	const [localRange, setLocalRange] = React.useState<[string, string | null]>([
		'',
		null,
	])
	const [isDragging, setIsDragging] = React.useState(false)

	useHotkeys(
		'arrowLeft',
		() => handleMonthChange(-1, new TZDate(currentDate, 'UTC'), setParams),
		{
			enabled: !selectedDate,
		},
	)

	useHotkeys(
		'arrowRight',
		() => handleMonthChange(1, new TZDate(currentDate, 'UTC'), setParams),
		{
			enabled: !selectedDate,
		},
	)

	const ref = useClickAway<HTMLDivElement>(() => {
		if (range?.length === 1) return setParams({ range: null })
	})

	const handleMouseDown = (date: TZDate) => {
		setIsDragging(true)
		setLocalRange([formatISO(date, { representation: 'date' }), null])
	}

	const handleMouseEnter = (date: TZDate) => {
		if (isDragging) {
			setLocalRange((prev) => [
				prev[0],
				formatISO(date, { representation: 'date' }),
			])
		}
	}

	const handleMouseUp = async () => {
		setIsDragging(false)
		if (localRange[0] && localRange[1]) {
			let start = new TZDate(localRange[0], 'UTC')
			let end = new TZDate(localRange[1], 'UTC')
			if (start > end) [start, end] = [end, start]

			await setParams({
				range: [localRange[0], localRange[1]],
				selectedDate: null,
			})
		} else if (localRange[0]) {
			await setParams({ selectedDate: localRange[0], range: null })
		}

		return setLocalRange(['', null])
	}

	return (
		<div ref={ref} className="shadow-outline grid grid-cols-7 gap-px">
			{firstWeek.map((day) => (
				<div
					key={day.toString()}
					className="bg-background px-3 py-4 font-mono text-xs font-medium text-[#878787]"
				>
					{format(day, 'EEE').toUpperCase()}
				</div>
			))}
			{calendarDays.map((date, index) => (
				<TimesheetsCalendarDay
					key={index.toString()}
					date={date}
					data={data}
					localRange={localRange}
					isDragging={isDragging}
					handleMouseDown={handleMouseDown}
					handleMouseEnter={handleMouseEnter}
					handleMouseUp={handleMouseUp}
				/>
			))}
		</div>
	)
}
