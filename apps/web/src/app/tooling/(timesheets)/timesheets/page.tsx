import * as React from 'react'
import { TimesheetGenerator } from './generator'

export default function TimesheetGeneratorPage() {
	return (
		<React.Suspense fallback={null}>
			<TimesheetGenerator />
		</React.Suspense>
	)
}
