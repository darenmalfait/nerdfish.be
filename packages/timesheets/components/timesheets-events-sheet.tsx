'use client'

import { formatISO } from '@repo/calendar/utils'
import {
	Drawer,
	DrawerContent,
	DrawerHeader,
	DrawerTitle,
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	useMediaQuery,
} from '@repo/design-system/components/ui'
import * as React from 'react'
import { useTimesheetsParams } from '../hooks/use-timesheets-params'
import { type TimesheetsData } from '../schemas'
import { TimesheetsSchedule } from './timesheets-schedule'

interface TimesheetsEventsSheetProps
	extends Omit<React.ComponentProps<typeof TimesheetsSchedule>, 'data'> {
	data: TimesheetsData
}

export function TimesheetsEventsSheet({
	data,
	...scheduleProps
}: TimesheetsEventsSheetProps) {
	const isDesktop = useMediaQuery('(min-width: 768px)')
	const { setParams, project, range, selectedDate, update, create } =
		useTimesheetsParams()

	const isOpen =
		!update &&
		!create &&
		(Boolean(project) || range?.length === 2 || Boolean(selectedDate))

	const events = selectedDate
		? (data[formatISO(selectedDate, { representation: 'date' })] ?? [])
		: []

	if (isDesktop) {
		return (
			<Sheet
				open={isOpen}
				onOpenChange={() =>
					setParams({ project: null, range: null, selectedDate: null })
				}
			>
				<SheetContent className="overflow-y-auto">
					<SheetHeader className="mb-lg">
						<SheetTitle>Schedule</SheetTitle>
					</SheetHeader>
					<TimesheetsSchedule data={events} {...scheduleProps} />
				</SheetContent>
			</Sheet>
		)
	}

	return (
		<Drawer
			open={isOpen}
			onOpenChange={(open: boolean) => {
				if (!open) {
					return setParams({ project: null, range: null, selectedDate: null })
				}
			}}
		>
			<DrawerContent className="px-md">
				<DrawerHeader>
					<DrawerTitle>Schedule</DrawerTitle>
				</DrawerHeader>
				<TimesheetsSchedule data={events} {...scheduleProps} />
			</DrawerContent>
		</Drawer>
	)
}
