'use client'

import {
	Drawer,
	DrawerContent,
	DrawerHeader,
	DrawerTitle,
} from '@nerdfish/react/drawer'
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
} from '@nerdfish/react/sheet'
import { formatISO } from '@repo/calendar/utils'
import { useMediaQuery } from '@repo/design-system/hooks/use-media-query'
import { useTimesheetsParams } from '../hooks/use-timesheets-params'
import { useTimesheets } from '../providers/timesheets-provider'
import { TimesheetsSchedule } from './timesheets-schedule'

export function TimesheetsEventsSheet() {
	const { timesheets } = useTimesheets()
	const isDesktop = useMediaQuery('(min-width: 768px)')
	const { setParams, project, range, selectedDate, update, create } =
		useTimesheetsParams()

	const isOpen =
		!update &&
		!create &&
		(Boolean(project) || range?.length === 2 || Boolean(selectedDate))

	const events = selectedDate
		? (timesheets[formatISO(selectedDate, { representation: 'date' })] ?? [])
		: []

	if (isDesktop) {
		return (
			<Sheet
				open={isOpen}
				onOpenChange={() =>
					setParams({ project: null, range: null, selectedDate: null })
				}
			>
				<SheetContent className="p-friends overflow-y-auto" variant="inset">
					<SheetHeader className="mb-casual">
						<SheetTitle>Schedule</SheetTitle>
					</SheetHeader>
					<TimesheetsSchedule data={events} />
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
			<DrawerContent className="px-friends">
				<div className="py-casual">
					<DrawerHeader>
						<DrawerTitle>Schedule</DrawerTitle>
					</DrawerHeader>
					<TimesheetsSchedule data={events} />
				</div>
			</DrawerContent>
		</Drawer>
	)
}
