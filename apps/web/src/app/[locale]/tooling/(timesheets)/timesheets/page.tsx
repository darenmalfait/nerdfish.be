import * as React from 'react'
import { TimesheetGenerator } from './generator'

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
			<TimesheetGenerator />
		</React.Suspense>
	)
}
