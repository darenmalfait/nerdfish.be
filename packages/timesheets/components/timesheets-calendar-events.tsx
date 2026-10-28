'use client'

import { Badge } from '@nerdfish/react/badge'
import {
	TooltipProvider,
	Tooltip,
	TooltipTrigger,
	TooltipContent,
} from '@nerdfish/react/tooltip'
import { secondsToHoursAndMinutes } from '@repo/calendar/utils'
import { cn } from '@repo/lib/utils/class'
import { type TimesheetsRecord } from '../schemas'

const NO_RECORDS: TimesheetsRecord[] = []

function TimesheetsCalendarFirstEvent({
	record,
	isToday,
}: {
	record?: TimesheetsRecord
	isToday: boolean
}) {
	if (!record) return null

	return (
		<Tooltip>
			<TooltipTrigger>
				<Badge
					className={cn(
						isToday &&
							'bg-accent text-accent-foreground gap-sm flex w-full items-center justify-between',
					)}
				>
					<span className="text-foreground-inverted line-clamp-1 w-full flex-1 text-sm">
						{record.project}
					</span>
					<span className="text-foreground-inverted/60 shrink-0 text-sm">
						({secondsToHoursAndMinutes(record.duration)})
					</span>
				</Badge>
			</TooltipTrigger>
			<TooltipContent>
				<p>{record.project}</p>
				<p>({secondsToHoursAndMinutes(record.duration)})</p>
			</TooltipContent>
		</Tooltip>
	)
}

function TimesheetsCalendarMoreEvents({ data }: { data: TimesheetsRecord[] }) {
	if (data.length <= 1) return null

	return (
		<Tooltip>
			<TooltipTrigger>
				<Badge>+{data.length - 1} more</Badge>
			</TooltipTrigger>
			<TooltipContent>
				<p>{data.map((event) => event.project).join(', ')}</p>
			</TooltipContent>
		</Tooltip>
	)
}

export function TimesheetsCalendarEvents({
	data = NO_RECORDS,
	isToday,
}: {
	data?: TimesheetsRecord[]
	isToday: boolean
}) {
	return (
		<TooltipProvider>
			<div className="space-y-sm flex w-full flex-col font-sans">
				<TimesheetsCalendarFirstEvent record={data[0]} isToday={isToday} />
				<TimesheetsCalendarMoreEvents data={data} />
			</div>
		</TooltipProvider>
	)
}
