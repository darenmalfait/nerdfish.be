import { Timesheets } from '@repo/timesheets/components/timesheets'
import { type Metadata } from 'next'
import { Suspense } from 'react'

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
			<Timesheets />
		</Suspense>
	)
}
