import { format, setHours, setMinutes, addMinutes } from 'date-fns'
import { type CalendarEvent } from './schemas'

export const NEW_EVENT_ID = 'new-event'

export const formatHour = (hour: number, timeFormat: number) => {
	const date = new Date()
	date.setHours(hour, 0, 0, 0)
	return format(date, timeFormat === 12 ? 'hh:mm a' : 'HH:mm')
}

export const getTimeFromDate = (date: Date) => {
	return format(date, 'HH:mm')
}

export const getSlotFromDate = (date: Date) => {
	return date.getHours() * 4 + Math.floor(date.getMinutes() / 15)
}

export function secondsToHoursAndMinutes(seconds: number) {
	const hours = Math.floor(seconds / 3600)
	const minutes = Math.floor((seconds % 3600) / 60)

	if (hours && minutes) {
		return `${hours}:${minutes.toString().padStart(2, '0')}h`
	}

	if (hours) {
		return `${hours}h`
	}

	if (minutes) {
		return `${minutes}m`
	}

	return '0h'
}

export const createNewEvent = (slot: number, title: string): CalendarEvent => {
	const startDate = setMinutes(
		setHours(new Date(), Math.floor(slot / 4)),
		(slot % 4) * 15,
	)
	const endDate = addMinutes(startDate, 15)
	return {
		id: NEW_EVENT_ID,
		start: startDate,
		end: endDate,
		title,
	}
}

export const updateEventTime = (
	event: CalendarEvent,
	start: Date,
	end: Date,
): CalendarEvent => {
	return { ...event, start, end }
}
