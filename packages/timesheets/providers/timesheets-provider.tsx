'use client'

import {
	differenceInSeconds,
	formatISO,
	format,
	parseISO,
	TZDate,
	NEW_EVENT_ID,
	eachDayOfInterval,
} from '@repo/calendar/utils'
import { useLocalStorage } from '@repo/lib/hooks/use-local-storage'
import { type ActionResponse } from '@repo/lib/types'
import { getCrypto } from '@repo/lib/utils/misc'
import * as React from 'react'
import { type TimesheetsProjectFormData } from '../forms/timesheets-project-form.schema'
import { type TimesheetsRecordFormData } from '../forms/timesheets-record-form.schema'
import {
	type TimesheetsRecord,
	type TimesheetsData,
	type TimesheetsProject,
} from '../schemas'
import { TIMEZONE } from '../utils'

export type TimesheetsScheduleCreateEvent = ({
	values,
	selectedDate,
	range,
}: {
	values: TimesheetsRecordFormData
	selectedDate: string | null
	range: string[] | null
}) => Promise<ActionResponse<void>>

export type TimesheetsScheduleDeleteEvent = (
	id: string,
	selectedDate: string | null,
) => Promise<ActionResponse<void>>

export type TimesheetsScheduleUpdateEvent = (
	id: string,
	values: TimesheetsRecordFormData,
	selectedDate: string | null,
) => Promise<ActionResponse<void>>

export type TimesheetsProjectCreateEvent = (
	values: TimesheetsProjectFormData,
) => Promise<ActionResponse<TimesheetsProject>>

export type TimesheetsProjectDeleteEvent = (
	id: string,
) => Promise<ActionResponse<void>>

export type TimesheetsProjectUpdateEvent = (
	id: string,
	values: TimesheetsProjectFormData,
) => Promise<ActionResponse<void>>

interface TimesheetsContextProps {
	// events
	timesheets: TimesheetsData
	onCreateEvent: TimesheetsScheduleCreateEvent
	onDeleteEvent: TimesheetsScheduleDeleteEvent
	onUpdateEvent: TimesheetsScheduleUpdateEvent

	// projects
	projects: TimesheetsProject[]
	onCreateProject: TimesheetsProjectCreateEvent
	onDeleteProject: TimesheetsProjectDeleteEvent
	onUpdateProject: TimesheetsProjectUpdateEvent
}

const TimesheetsContext = React.createContext<TimesheetsContextProps | null>(
	null,
)
TimesheetsContext.displayName = 'TimesheetsContext'

interface TimesheetsProviderProps {
	children: React.ReactNode
}

// import { TimesheetsProvider } from "path-to-context/TimesheetsContext"
// use <TimesheetsProvider> as a wrapper around the part you need the context for
export function TimesheetsProvider({ children }: TimesheetsProviderProps) {
	const [timesheets, setTimesheets] = useLocalStorage<TimesheetsData>(
		'timesheets',
		{},
	)
	const [projects, setProjects] = useLocalStorage<TimesheetsProject[]>(
		'timesheets-projects',
		[],
	)

	const onCreateEvent: TimesheetsScheduleCreateEvent = React.useCallback(
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
				projectId: values.projectId,
				description: values.description ?? '',
				duration: Math.max(0, differenceInSeconds(endDate, startDate)),
			}

			const entries = dates.map((date) => ({
				...newEvent,
				date: new TZDate(date, TIMEZONE).toISOString(),
				start: new TZDate(newEvent.start, TIMEZONE).toISOString(),
				end: new TZDate(newEvent.end, TIMEZONE).toISOString(),
			}))

			setTimesheets({
				...timesheets,
				...entries.reduce<Record<string, TimesheetsRecord[]>>((acc, entry) => {
					// key is date xxxx-xx-xx
					const key = formatISO(new Date(entry.date), {
						representation: 'date',
					})

					// append current timesheets and new entry
					acc[key] = [
						...(timesheets[key]?.filter((e) => e.id && e.id !== NEW_EVENT_ID) ??
							[]),
						...(acc[key]?.filter((e) => e.id && e.id !== NEW_EVENT_ID) ?? []),
						entry,
					]
					return acc
				}, {}),
			})

			return { success: true }
		},
		[timesheets, setTimesheets],
	)

	const onDeleteEvent: TimesheetsScheduleDeleteEvent = React.useCallback(
		async (id, selectedDate) => {
			if (!selectedDate) return { success: false }

			const formattedDate = formatISO(selectedDate, {
				representation: 'date',
			})

			if (!timesheets[formattedDate]) return { success: false }

			setTimesheets({
				...timesheets,
				[formattedDate]: timesheets[formattedDate].filter((e) => e.id !== id),
			})

			return { success: true }
		},
		[timesheets, setTimesheets],
	)

	const onUpdateEvent: TimesheetsScheduleUpdateEvent = React.useCallback(
		async (id, values, selectedDate) => {
			if (!selectedDate) return { success: false }

			const formattedDate = formatISO(selectedDate, {
				representation: 'date',
			})

			if (!timesheets[formattedDate]) return { success: false }

			const startDate = parseISO(`${selectedDate}T${values.start}`)
			const endDate = parseISO(`${selectedDate}T${values.end}`)

			const updatedEvent: TimesheetsRecord = {
				...values,
				date: new TZDate(selectedDate, TIMEZONE).toISOString(),
				start: new TZDate(startDate.toISOString(), TIMEZONE).toISOString(),
				end: new TZDate(endDate.toISOString(), TIMEZONE).toISOString(),
				duration: Math.max(0, differenceInSeconds(endDate, startDate)),
			}

			setTimesheets({
				...timesheets,
				[formattedDate]: [
					...timesheets[formattedDate].filter((e) => e.id !== id),
					updatedEvent,
				],
			})

			return { success: true }
		},
		[timesheets, setTimesheets],
	)

	const onCreateProject: TimesheetsProjectCreateEvent = React.useCallback(
		async (values) => {
			const newProject = {
				...values,
				id: getCrypto().randomUUID(),
			}
			setProjects([...projects, newProject])

			return { success: true, data: newProject }
		},
		[projects, setProjects],
	)

	const onDeleteProject: TimesheetsProjectDeleteEvent = React.useCallback(
		async (id) => {
			setProjects(projects.filter((p) => p.id !== id))

			return { success: true }
		},
		[projects, setProjects],
	)

	const onUpdateProject: TimesheetsProjectUpdateEvent = React.useCallback(
		async (id, values) => {
			setProjects(projects.map((p) => (p.id === id ? { ...p, ...values } : p)))

			return { success: true }
		},
		[projects, setProjects],
	)

	return (
		<TimesheetsContext
			value={{
				// events
				timesheets,
				onCreateEvent,
				onDeleteEvent,
				onUpdateEvent,

				// projects
				projects,
				onCreateProject,
				onDeleteProject,
				onUpdateProject,
			}}
		>
			{children}
		</TimesheetsContext>
	)
}

// import { useTimesheets } fron "path-to-context/TimesheetsContext"
// within functional component
// const { sessionToken, ...TimesheetsContext } = useTimesheets()
export function useTimesheets(): TimesheetsContextProps {
	const context = React.useContext(TimesheetsContext)

	if (!context) {
		throw new Error('You should use useTimesheets within an TimesheetsContext')
	}

	return context
}

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
