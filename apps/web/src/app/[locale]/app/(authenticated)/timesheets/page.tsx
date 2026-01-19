import { Timesheets } from '@repo/timesheets/components/timesheets'
import { type Metadata } from 'next'
import { Suspense } from 'react'
import { AppHeader } from '../../components/app-header'

export const metadata: Metadata = {
	title: 'Timesheet Generator',
	robots: {
		index: false,
		follow: false,
	},
}

export default function TimesheetGeneratorPage() {
	return (
		<>
			<AppHeader pages={['App']} page="Timesheets" />
			<Suspense fallback={null}>
				<Timesheets />
			</Suspense>
		</>
	)
}
