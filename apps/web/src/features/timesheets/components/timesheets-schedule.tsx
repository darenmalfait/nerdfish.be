import { useRef, useState } from 'react'
import { ScrollArea } from '@nerdfish/react/scroll-area'
import { toast } from '@nerdfish/react/toast'

import {
	CalendarDay,
	CALENDARY_DAY_ROW_HEIGHT,
} from '@repo/calendar/components/calendar-day'
import { NEW_EVENT_ID } from '@repo/calendar/utils'
import { useTranslations } from '@repo/i18n/client'
import { useMountEffect } from '@repo/lib/hooks/use-mount-effect'

import { TimesheetsRecordForm } from '../forms/timesheets-record-form'
import { type TimesheetsRecordFormData } from '../forms/timesheets-record-form.schema'
import { useTimesheetsParams } from '../hooks/use-timesheets-params'
import { useTimesheets } from '../providers/timesheets-provider'
import { type TimesheetsRecord } from '../types/timesheets'
import { toCalendarEventFromTimesheetsRecord } from '../utils/to-calendar-event-from-timesheets-record'
import { toTimesheetsRecordFormDataFromTimesheetsRecord } from '../utils/to-timesheets-record-form-data-from-timesheets-record'
import { toTimesheetsRecordFromCalendarEvent } from '../utils/to-timesheets-record-from-calendar-event'
import { toTimesheetsRecordFromTimesheetsRecordFormData } from '../utils/to-timesheets-record-from-timesheets-record-form-data'

import { TimesheetsDaySelect } from './timesheets-day-select'

interface TimesheetsScheduleProps {
	data: TimesheetsRecord[]
}

export function TimesheetsSchedule({
	data: dataProp,
}: TimesheetsScheduleProps) {
	const t = useTranslations('timesheets.schedule')
	const { onCreateEvent, onDeleteEvent, onUpdateEvent } = useTimesheets()

	const scrollRef = useRef<HTMLDivElement>(null)
	const { selectedDate, range, setParams } = useTimesheetsParams()
	const [selectedEvent, setSelectedEvent] = useState<
		TimesheetsRecord | undefined
	>(dataProp.at(-1))
	const [data, setData] = useState(dataProp)
	const [prevDataProp, setPrevDataProp] = useState(dataProp)

	// Reset local schedule data when the URL-driven prop changes
	if (dataProp !== prevDataProp) {
		setPrevDataProp(dataProp)
		setData(dataProp)
	}

	useMountEffect(() => {
		if (!scrollRef.current) return

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
	})

	async function handleSubmit(values: TimesheetsRecordFormData) {
		const isCreate = !values.id || values.id === NEW_EVENT_ID

		if (isCreate) {
			setSelectedEvent(undefined)

			const result = await onCreateEvent({
				values,
				selectedDate,
				range,
			})

			if (!result.success) return toast.error(t('createFailed'))

			await setParams({ selectedDate: null, range: null })
			return toast.success(t('created'))
		} else {
			if (!values.id)
				throw new Error(
					'Cannot update timesheet record: submitted values have no id',
				)

			const result = await onUpdateEvent(values.id, values, selectedDate)

			if (!result.success) return toast.error(t('updateFailed'))

			await setParams({ selectedDate: null, range: null })
			return toast.success(t('updated'))
		}
	}

	async function handleDeleteEvent(id: string) {
		setData((prevData) => prevData.filter((e) => e.id !== id))
		await onDeleteEvent(id, selectedDate)
		await setParams({ selectedDate: null, range: null })

		return toast.success(t('deleted'))
	}

	function handleFormTimeChange(start: string, end: string) {
		if (!selectedEvent || !start || !end) return

		const updated = toTimesheetsRecordFromTimesheetsRecordFormData({
			...toTimesheetsRecordFormDataFromTimesheetsRecord(selectedEvent),
			date: selectedEvent.date,
			start,
			end,
		})

		setSelectedEvent(updated)
		setData((current) =>
			current.map((event) => (event.id === updated.id ? updated : event)),
		)
	}

	return (
		<div>
			<TimesheetsDaySelect />

			<ScrollArea
				ref={scrollRef}
				className="mb-casual mt-casual p-friends rounded-base border-border h-[calc(80vh-480px)]"
			>
				<CalendarDay
					selectedEvent={
						selectedEvent
							? toCalendarEventFromTimesheetsRecord(selectedEvent)
							: undefined
					}
					value={data.map(toCalendarEventFromTimesheetsRecord)}
					onDeleteEvent={handleDeleteEvent}
					onChange={(values) => {
						setData(values.map(toTimesheetsRecordFromCalendarEvent))
					}}
					onEventSelect={(event) => {
						if (!event) setSelectedEvent(undefined)
						else setSelectedEvent(toTimesheetsRecordFromCalendarEvent(event))
					}}
				/>
			</ScrollArea>

			<TimesheetsRecordForm
				key={selectedEvent?.id}
				defaultValues={
					selectedEvent
						? toTimesheetsRecordFormDataFromTimesheetsRecord(selectedEvent)
						: undefined
				}
				onTimeChange={handleFormTimeChange}
				onSubmit={handleSubmit}
			/>
		</div>
	)
}
