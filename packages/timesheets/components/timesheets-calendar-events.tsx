'use client'

import { secondsToHoursAndMinutes } from '@repo/calendar/utils'
import { cx } from '@repo/lib/utils/base'
import { useTimesheets } from '../providers/timesheets-provider'
import { type TimesheetsRecord } from '../schemas'

export function TimesheetsCalendarEvents({
	data = [],
	isToday,
}: {
	data?: TimesheetsRecord[]
	isToday: boolean
}) {
	const { projects } = useTimesheets()

	return (
		<div className="flex w-full flex-col space-y-2 font-sans">
			{data.length > 0 ? (
				<div
					className={cx(
						'bg-foreground rounded-base text-background px-sm py-xs line-clamp-1 min-h-[23px] w-full text-left text-xs',
						isToday && 'bg-foreground',
					)}
					key={data[0]?.id}
				>
					{projects.find((project) => project.id === data[0]?.projectId)?.name}{' '}
					({secondsToHoursAndMinutes(data[0]?.duration ?? 0)})
				</div>
			) : null}
			{data.length > 1 ? (
				<div className="text-foreground w-full p-1 text-left text-xs">
					+{data.length - 1} more
				</div>
			) : null}
		</div>
	)
}
