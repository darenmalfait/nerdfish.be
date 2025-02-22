import {
	CalendarDay,
	CALENDARY_DAY_ROW_HEIGHT,
} from '@repo/calendar/components/calendar-day'
import { NEW_EVENT_ID } from '@repo/calendar/utils'
import { ScrollArea, toast } from '@repo/design-system/components/ui'
import { type ActionResponse } from '@repo/lib/types'
import * as React from 'react'
import { TimesheetsRecordForm } from '../forms/timesheets-record-form'
import { type TimesheetsRecordFormData } from '../forms/timesheets-record-form.schema'
import { useTimesheetsParams } from '../hooks/use-timesheets-params'
import { type TimesheetRecord } from '../schemas'
import {
	transformCalendarEventToTimesheetsRecord,
	transformTimesheetsRecordToCalendarEvent,
	transformTimesheetsRecordToFormData,
} from '../utils'
import { TimesheetsDaySelect } from './timesheets-day-select'

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

interface TimesheetsScheduleProps {
	data: TimesheetRecord[]

	// events
	onCreateEvent?: TimesheetsScheduleCreateEvent
	onDeleteEvent?: TimesheetsScheduleDeleteEvent
	onUpdateEvent?: TimesheetsScheduleUpdateEvent
}

export function TimesheetsSchedule({
	data: dataProp,
	onCreateEvent,
	onDeleteEvent,
	onUpdateEvent,
}: TimesheetsScheduleProps) {
	const scrollRef = React.useRef<HTMLDivElement>(null)
	const { selectedDate, range, setParams } = useTimesheetsParams()
	const [selectedEvent, setSelectedEvent] = React.useState<
		TimesheetRecord | undefined
	>(dataProp.length > 0 ? dataProp[dataProp.length - 1] : undefined)
	const [data, setData] = React.useState<TimesheetRecord[]>(dataProp)

	React.useEffect(() => {
		if (scrollRef.current) {
			const currentHour = new Date().getHours()
			if (currentHour >= 12) {
				scrollRef.current.scrollTo({
					top: scrollRef.current.scrollHeight,
				})
			} else {
				scrollRef.current.scrollTo({
					top: CALENDARY_DAY_ROW_HEIGHT * 6,
				})
			}
		}
	}, [])

	React.useEffect(() => {
		// in case the url changes
		setData(dataProp)
	}, [dataProp])

	async function handleSubmit(values: TimesheetsRecordFormData) {
		const isCreate = !values.id || values.id === NEW_EVENT_ID

		if (isCreate) {
			setSelectedEvent(undefined)

			const result = await onCreateEvent?.({
				values,
				selectedDate,
				range,
			})

			if (!result?.success) return toast.error('Failed to create event')

			await setParams({ selectedDate: null, range: null })
			return toast.success('Event created')
		} else {
			if (!values.id)
				throw new Error('something went wrong, could not update event')

			const result = await onUpdateEvent?.(values.id, values, selectedDate)

			if (!result?.success) return toast.error('Failed to update event')

			await setParams({ selectedDate: null, range: null })
			return toast.success('Event updated')
		}
	}

	async function handleDeleteEvent(id: string) {
		setData(data.filter((e) => e.id !== id))
		await onDeleteEvent?.(id, selectedDate)
		await setParams({ selectedDate: null, range: null })

		return toast.success('Event deleted')
	}

	return (
		<div>
			<TimesheetsDaySelect />

			<ScrollArea ref={scrollRef} className="mb-lg mt-8 h-[calc(100vh-480px)]">
				<CalendarDay
					value={data.map(transformTimesheetsRecordToCalendarEvent)}
					onDeleteEvent={handleDeleteEvent}
					onChange={(values) => {
						setData(values.map(transformCalendarEventToTimesheetsRecord))
					}}
					onEventSelect={(event) => {
						if (!event) setSelectedEvent(undefined)
						else
							setSelectedEvent(transformCalendarEventToTimesheetsRecord(event))
					}}
				/>
			</ScrollArea>

			<TimesheetsRecordForm
				defaultValues={
					selectedEvent
						? transformTimesheetsRecordToFormData(selectedEvent, selectedDate)
						: undefined
				}
				onSubmit={handleSubmit}
			/>
		</div>
	)
}
