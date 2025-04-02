import { Timesheets } from '@repo/timesheets/components/timesheets'
import * as React from 'react'
import { TimesheetGenerator } from './components/generator'
import { TimesheetProvider } from './timesheet-provider'

export const metadata = {
	title: 'Timesheet Generator',
	robots: {
		index: false,
		follow: false,
	},
}

export default function TimesheetGeneratorPage() {
	return (
		<React.Suspense fallback={null}>
			<TimesheetProvider>
				<TimesheetGenerator />
			</TimesheetProvider>
			<div className="container">
				<Timesheets />
			</div>
		</React.Suspense>
	)
}
