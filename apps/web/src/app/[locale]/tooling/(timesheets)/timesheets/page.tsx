import { Section } from '@repo/design-system/components/section'
import { Timesheets } from '@repo/timesheets/components/timesheets'
import * as React from 'react'
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
				<Section>
					<Timesheets />
				</Section>
			</TimesheetProvider>
		</React.Suspense>
	)
}
