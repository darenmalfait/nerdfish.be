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

export function TimesheetsCalendarEvents({
	data = [],
	isToday,
}: {
	data?: TimesheetsRecord[]
	isToday: boolean
}) {
	return (
		<TooltipProvider>
			<div className="space-y-sm flex w-full flex-col font-sans">
				{data.length > 0 ? (
					<Tooltip>
						<TooltipTrigger>
							<Badge
								className={cn(
									isToday &&
										'bg-accent text-accent-foreground gap-sm flex w-full items-center justify-between',
								)}
								key={data[0]?.id}
							>
								<span className="text-foreground-inverted line-clamp-1 w-full flex-1 text-sm">
									{data[0]?.project}
								</span>
								<span className="text-foreground-inverted/60 shrink-0 text-sm">
									({secondsToHoursAndMinutes(data[0]?.duration ?? 0)})
								</span>
							</Badge>
						</TooltipTrigger>
						<TooltipContent>
							<p>{data[0]?.project}</p>
							<p>({secondsToHoursAndMinutes(data[0]?.duration ?? 0)})</p>
						</TooltipContent>
					</Tooltip>
				) : null}
				{data.length > 1 ? (
					<Tooltip>
						<TooltipTrigger>
							<Badge>+{data.length - 1} more</Badge>
						</TooltipTrigger>
						<TooltipContent>
							<p>{data.map((event) => event.project).join(', ')}</p>
						</TooltipContent>
					</Tooltip>
				) : null}
			</div>
		</TooltipProvider>
	)
}
