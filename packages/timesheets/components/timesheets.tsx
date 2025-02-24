'use client'

import { TimesheetsProvider } from '../providers/timesheets-provider'
import { TimesheetsCalendar } from './timesheets-calendar'
import { TimesheetsEventsSheet } from './timesheets-events-sheet'
import { TimesheetsMonthSelect } from './timesheets-month-select'

export function Timesheets() {
	return (
		<TimesheetsProvider>
			<div className="gap-md flex flex-col">
				<div className="flex items-center justify-end">
					<TimesheetsMonthSelect />
				</div>

				<TimesheetsCalendar />
				<TimesheetsEventsSheet />
			</div>
		</TimesheetsProvider>
	)
}
