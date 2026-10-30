import { Suspense } from 'react'
import { type Metadata } from 'next'

import { AppHeader } from '~/features/app-shell/components/app-header'
import { Timesheets } from '~/features/timesheets/components/timesheets'

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
