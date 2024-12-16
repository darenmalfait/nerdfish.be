// Thanks to Rafaël Mindreau for the inspiration 🙏
'use client'

import * as React from 'react'
import { useTimesheet } from '../timesheet-provider'
import { CalendarOverview } from './calendar-overview'
import { TimesheetsContent } from './timesheets-content'
import { Toolbar } from './toolbar'

export function TimesheetGenerator() {
	const ref = React.useRef<HTMLDivElement>(null)

	const { timesheet } = useTimesheet()
	const { invoiceReference, timeEntries } = timesheet

	React.useEffect(() => {
		if (ref.current) {
			// get height in mm
			// 1 pixel (X) = 0.2645833333 mm
			const height = ref.current.clientHeight * 0.2645833333
			const style = document.createElement('style')
			style.innerHTML = `@page {size: 80mm ${height}mm}`
			document.head.appendChild(style)
		}
	}, [invoiceReference, timeEntries])

	return (
		<div className="p-md pb-3xl print:p-0">
			<div ref={ref} className="mx-auto w-[80mm] print:[box-shadow:none]">
				<div className="rounded-base p-md pb-lg shadow-outline mb-xl print:hidden">
					<CalendarOverview />
				</div>
				<div className="rounded-base p-md pb-lg shadow-outline relative">
					<TimesheetsContent />
				</div>
			</div>
			<Toolbar />
		</div>
	)
}
