'use client'

import { Badge } from '@nerdfish/react/badge'
import { secondsToHoursAndMinutes } from '@repo/calendar/utils'
import { cn } from '@repo/lib/utils/class'
import { type TimesheetsRecord } from '../schemas'

export function TimesheetsCalendarEvents({
	data = [],
	isToday,
}: {
	data?: TimesheetsRecord[]
	isToday: boolean
}) {
	return (
		<div className="flex w-full flex-col space-y-2 font-sans">
			{data.length > 0 ? (
				<Badge
					className={cn(isToday && 'bg-accent text-accent-foreground')}
					key={data[0]?.id}
				>
					{data[0]?.project} ({secondsToHoursAndMinutes(data[0]?.duration ?? 0)}
					)
				</Badge>
			) : null}
			{data.length > 1 ? <Badge>+{data.length - 1} more</Badge> : null}
		</div>
	)
}
