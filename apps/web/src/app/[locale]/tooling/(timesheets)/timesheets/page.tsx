import { Timesheets } from '@repo/timesheets/components/timesheets'
import { type Metadata } from 'next'
import { Suspense } from 'react'
import { TimesheetGenerator } from './components/generator'
import { TimesheetProvider } from './timesheet-provider'

export const metadata: Metadata = {
	title: 'Timesheet Generator',
	robots: {
		index: false,
		follow: false,
	},
}

export default function TimesheetGeneratorPage() {
	return (
		<Suspense fallback={null}>
			<TimesheetProvider>
				<TimesheetGenerator />
			</TimesheetProvider>
			<div className="container">
				<Timesheets />
			</div>
		</Suspense>
	)
}
