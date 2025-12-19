'use client'

import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuShortcut,
	ContextMenuTrigger,
} from '@nerdfish/react/context-menu'
import { useControllableState } from '@nerdfish/react/hooks/use-controllable-state'
import { useHotkeys } from '@repo/lib/hooks/use-hotkeys'
import { cn } from '@repo/lib/utils/class'
import {
	addMinutes,
	differenceInSeconds,
	endOfDay,
	setHours,
	setMinutes,
	startOfDay,
} from 'date-fns'
import {
	type MouseEvent,
	useState,
	type HTMLAttributes,
	useEffect,
	Fragment,
} from 'react'
import { type CalendarEvent } from '../schemas'
import {
	createNewEvent,
	formatHour,
	getSlotFromDate,
	NEW_EVENT_ID,
	secondsToHoursAndMinutes,
	updateEventTime,
} from '../utils'

export const CALENDARY_DAY_ROW_HEIGHT = 36
export const CALENDARY_DAY_SLOT_HEIGHT = 9

export interface CalendarDayProps extends Omit<
	HTMLAttributes<HTMLDivElement>,
	'onChange' | 'defaultValue' | 'value'
> {
	timeFormat?: 24 | 12

	// values
	value?: CalendarEvent[]
	defaultValue?: CalendarEvent[]
	selectedEvent?: CalendarEvent | null
	defaultProject?: CalendarEvent['project']

	// events
	onEventSelect?: (event: CalendarEvent | null) => void
	onChange?: (value: CalendarEvent[]) => void
	onDeleteEvent?: (eventId: string) => void
}

export function CalendarDay({
	timeFormat = 24,
	className,

	// values,
	value: valueProp,
	defaultValue = [],
	selectedEvent: selectedEventProp,
	defaultProject,

	// events
	onEventSelect,
	onChange,
	onDeleteEvent,

	// rest
	...props
}: CalendarDayProps) {
	const [isContextMenuOpen, setIsContextMenuOpen] = useState(false)
	const hours = Array.from({ length: 24 }, (_, i) => i)

	// values
	const [value = [], setValue] = useControllableState({
		prop: valueProp,
		defaultProp: defaultValue,
		onChange,
	})

	const [selectedEvent, setSelectedEvent] =
		useControllableState<CalendarEvent | null>({
			prop: selectedEventProp,
			defaultProp: null,
			onChange: onEventSelect,
		})

	// mouse events
	const [isDragging, setIsDragging] = useState(false)
	const [dragStartSlot, setDragStartSlot] = useState<number | null>(null)
	const [resizingEvent, setResizingEvent] = useState<CalendarEvent | null>(null)
	const [resizeStartY, setResizeStartY] = useState(0)
	const [resizeType, setResizeType] = useState<'top' | 'bottom' | null>(null)
	const [movingEvent, setMovingEvent] = useState<CalendarEvent | null>(null)
	const [moveStartY, setMoveStartY] = useState(0)

	// events handlers
	const handleDeleteEvent = (eventId: string) => {
		onDeleteEvent?.(eventId)

		setValue(value.filter((event) => event.id !== eventId))
		setSelectedEvent(null)
	}

	const handleEventClick = (event: CalendarEvent) => {
		if (selectedEvent && selectedEvent.id === NEW_EVENT_ID) {
			setValue(value.filter((e) => e.id !== selectedEvent.id))
		}

		setSelectedEvent(event)
	}

	useHotkeys(
		'backspace',
		() => {
			if (selectedEvent && selectedEvent.id !== NEW_EVENT_ID) {
				handleDeleteEvent(selectedEvent.id)
			}
		},
		[selectedEvent],
	)

	// gestures mouse events
	const handleMouseDown = (slot: number) => {
		if (selectedEvent && selectedEvent.id === NEW_EVENT_ID) {
			setValue(value.filter((event) => event.id !== selectedEvent.id))
		}

		setSelectedEvent(null)
		setIsDragging(true)
		setDragStartSlot(slot)

		const newEvent = createNewEvent(slot, defaultProject)

		setValue([...value.filter((event) => event.id !== NEW_EVENT_ID), newEvent])
		setSelectedEvent(newEvent)
	}

	const handleMouseMove = (e: MouseEvent) => {
		if (isDragging && dragStartSlot !== null && selectedEvent) {
			const rect = e.currentTarget.getBoundingClientRect()
			const y = e.clientY - rect.top
			const slot = Math.floor(y / CALENDARY_DAY_SLOT_HEIGHT)
			const start = Math.min(dragStartSlot, slot)
			const end = Math.max(dragStartSlot, slot)
			const startDate = setMinutes(
				setHours(new Date(), Math.floor(start / 4)),
				(start % 4) * 15,
			)
			const endDate = addMinutes(startDate, (end - start + 1) * 15)

			setValue(
				value.map((event) =>
					event.id === selectedEvent.id
						? updateEventTime(event, startDate, endDate)
						: event,
				),
			)

			setSelectedEvent(updateEventTime(selectedEvent, startDate, endDate))
		} else if (resizingEvent && resizingEvent.id !== NEW_EVENT_ID) {
			const deltaY = e.clientY - resizeStartY
			const deltaSlots = Math.round(deltaY / CALENDARY_DAY_SLOT_HEIGHT)
			if (resizeType === 'bottom') {
				const newEnd = addMinutes(resizingEvent.end, deltaSlots * 15)

				setValue(
					value.map((event) =>
						event.id === resizingEvent.id
							? updateEventTime(event, event.start, newEnd)
							: event,
					),
				)

				setSelectedEvent(
					updateEventTime(resizingEvent, resizingEvent.start, newEnd),
				)
			} else if (resizeType === 'top') {
				const newStart = addMinutes(resizingEvent.start, deltaSlots * 15)
				setValue(
					value.map((event) =>
						event.id === resizingEvent.id
							? updateEventTime(event, newStart, event.end)
							: event,
					),
				)

				setSelectedEvent(
					updateEventTime(resizingEvent, newStart, resizingEvent.end),
				)
			}
		} else if (movingEvent) {
			const deltaY = e.clientY - moveStartY
			const deltaSlots = Math.round(deltaY / CALENDARY_DAY_SLOT_HEIGHT)
			const newStart = addMinutes(movingEvent.start, deltaSlots * 15)
			const newEnd = addMinutes(movingEvent.end, deltaSlots * 15)

			// Ensure the event doesn't move before start of day or after end of day
			const dayStart = startOfDay(movingEvent.start)
			const dayEnd = endOfDay(movingEvent.start)

			if (newStart >= dayStart && newEnd <= dayEnd) {
				setValue(
					value.map((event) =>
						event.id === movingEvent.id
							? updateEventTime(event, newStart, newEnd)
							: event,
					),
				)
				setSelectedEvent(updateEventTime(movingEvent, newStart, newEnd))
			}
		}
	}

	useEffect(() => {
		function handleMouseUp() {
			setIsDragging(false)
			setDragStartSlot(null)
			setResizingEvent(null)
			setResizeType(null)
			setMovingEvent(null)
		}

		window.addEventListener('mouseup', handleMouseUp)
		return () => window.removeEventListener('mouseup', handleMouseUp)
	}, [])

	const handleEventResizeStart = (
		e: MouseEvent,
		event: CalendarEvent,
		type: 'top' | 'bottom',
	) => {
		if (event.id !== NEW_EVENT_ID) {
			e.stopPropagation()
			setResizingEvent(event)
			setResizeStartY(e.clientY)
			setResizeType(type)
			setSelectedEvent(event)
		}
	}

	const handleEventMoveStart = (
		mouseEvent: MouseEvent,
		calendarEvent: CalendarEvent,
	) => {
		mouseEvent.stopPropagation()
		// Delete unsaved event if it exists
		setValue(value.filter((event) => event.id !== NEW_EVENT_ID))
		setMovingEvent(calendarEvent)
		setMoveStartY(mouseEvent.clientY)
		setSelectedEvent(calendarEvent)
	}

	return (
		<div {...props} className={cn('text-foreground flex text-xs', className)}>
			<div className="w-20 shrink-0 select-none">
				{hours.map((hour) => (
					<div
						key={hour}
						className="pr-md flex flex-col font-mono"
						style={{ height: `${CALENDARY_DAY_ROW_HEIGHT}px` }}
					>
						{formatHour(hour, timeFormat)}
					</div>
				))}
			</div>

			<div
				className="relative grow cursor-default border-none select-none"
				onMouseMove={handleMouseMove}
				onMouseDown={(e) => {
					if (e.button === 0 && !isContextMenuOpen) {
						// Check if left mouse button is pressed
						const rect = e.currentTarget.getBoundingClientRect()
						const y = e.clientY - rect.top
						const slot = Math.floor(y / CALENDARY_DAY_SLOT_HEIGHT)
						handleMouseDown(slot)
					}
				}}
			>
				{hours.map((hour) => (
					<Fragment key={hour}>
						<div
							className="user-select-none border-foreground/20 absolute w-full border-t"
							style={{ top: `${hour * CALENDARY_DAY_ROW_HEIGHT}px` }}
						/>
					</Fragment>
				))}
				{value.map((event) => {
					const startSlot = getSlotFromDate(event.start)
					const endSlot = getSlotFromDate(event.end)
					const height = (endSlot - startSlot) * CALENDARY_DAY_SLOT_HEIGHT

					return (
						<ContextMenu
							key={event.id}
							onOpenChange={(open) => {
								if (!open) {
									// Delay closing the context menu to prevent it creating a new event
									setTimeout(() => setIsContextMenuOpen(false), 50)
								} else {
									setIsContextMenuOpen(true)
								}
							}}
						>
							<ContextMenuTrigger>
								<div
									onClick={() => handleEventClick(event)}
									className={cn(
										'border-border bg-background-muted/95 text-foreground absolute w-full border-t',
										event.id !== NEW_EVENT_ID && 'cursor-move',
										event.id === selectedEvent?.id &&
											'bg-foreground/80 text-background z-50',
									)}
									style={{
										top: `${startSlot * CALENDARY_DAY_SLOT_HEIGHT}px`,
										height: `${height}px`,
									}}
									onMouseDown={(e) =>
										event.id !== NEW_EVENT_ID && handleEventMoveStart(e, event)
									}
								>
									<div className="p-friends pointer-events-none flex flex-col justify-between text-xs select-none">
										<span className="font-bold">
											{event.project} (
											{secondsToHoursAndMinutes(
												differenceInSeconds(event.end, event.start),
											)}
											)
										</span>
										{event.subtitle ? <span>{event.subtitle}</span> : null}
										{event.description ? (
											<span>{event.description}</span>
										) : null}
									</div>
									{event.id !== NEW_EVENT_ID ? (
										<>
											<div
												className="absolute top-0 right-0 left-0 h-2 cursor-ns-resize"
												onMouseDown={(e) =>
													handleEventResizeStart(e, event, 'top')
												}
											/>
											<div
												className="absolute right-0 bottom-0 left-0 h-2 cursor-ns-resize"
												onMouseDown={(e) =>
													handleEventResizeStart(e, event, 'bottom')
												}
											/>
										</>
									) : null}
								</div>
							</ContextMenuTrigger>
							<ContextMenuContent>
								<ContextMenuItem
									onClick={(e) => {
										e.stopPropagation()
										handleDeleteEvent(event.id)
									}}
								>
									Delete <ContextMenuShortcut>⌫</ContextMenuShortcut>
								</ContextMenuItem>
							</ContextMenuContent>
						</ContextMenu>
					)
				})}
			</div>
		</div>
	)
}
