'use client'

import { format, TZDate } from '@repo/calendar/utils'
import { cn } from '@repo/lib/utils/class'
import { TIMEZONE } from '../../utils'

export interface CalendarYearProps {
	year: number
}

function getDaysInMonth(year: number, month: number): number {
	return new Date(year, month, 0).getDate()
}

function getDayOfWeek(year: number, month: number, day: number): number {
	const date = new TZDate(
		`${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
		TIMEZONE,
	)
	return date.getDay() || 7 // Convert Sunday (0) to 7
}

export function CalendarYear({ year }: CalendarYearProps) {
	const months = Array.from({ length: 12 }, (_, i) => i + 1)
	const days = Array.from({ length: 31 }, (_, i) => i + 1)

	return (
		<div className="w-full print:h-full">
			<div className="overflow-x-auto print:overflow-visible">
				<table className="w-full border-collapse border-separate border-spacing-x-2 print:h-[calc(100%-2.5rem)]">
					<thead>
						<tr>
							{months.map((month) => {
								const monthDate = new TZDate(
									`${year}-${String(month).padStart(2, '0')}-01`,
									TIMEZONE,
								)
								return (
									<th
										key={month}
										className="border-border border-b px-1 py-2 text-center font-mono text-xs font-normal uppercase print:py-0 print:text-[8px]"
									>
										{format(monthDate, 'MMM')}
									</th>
								)
							})}
						</tr>
					</thead>
					<tbody>
						{days.map((day) => (
							<tr key={day}>
								{months.map((month) => {
									const daysInMonth = getDaysInMonth(year, month)
									const isValidDate = day <= daysInMonth

									if (!isValidDate) {
										return (
											<td
												key={month}
												className="border-border border-b px-1 py-1 print:py-0"
											/>
										)
									}

									const dayOfWeek = getDayOfWeek(year, month, day)
									const isWeekend = dayOfWeek === 6 || dayOfWeek === 7
									const date = new TZDate(
										`${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
										TIMEZONE,
									)

									return (
										<td
											key={month}
											className={cn(
												'border-border border-b p-[0.6vmin] font-mono text-xs text-[0.9vmin] font-light print:text-[8px]',
												isWeekend && 'bg-background-muted font-normal',
											)}
										>
											<span className="inline-block w-[1.1em]">{day}</span>
											<span className="text-foreground-muted inline-block w-4 text-center">
												{format(date, 'EEE').charAt(0).toUpperCase()}
											</span>
										</td>
									)
								})}
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	)
}
