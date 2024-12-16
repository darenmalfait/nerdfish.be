'use client'

import * as React from 'react'
import { timesheetSchema, type Timesheet } from './utils'

interface TimesheetContextProps {
	timesheet: Timesheet
	setTimesheet: (timesheet: Partial<Timesheet>) => void
}

const TimesheetContext = React.createContext<TimesheetContextProps | null>(null)
TimesheetContext.displayName = 'TimesheetContext'

const initialTimesheet: Timesheet = {
	invoiceReference: '',
	person: 'Daren Malfait',
	timeEntries: [],
}

function reducer(state: Timesheet, newState: Partial<Timesheet>) {
	return timesheetSchema.parse({ ...state, ...newState })
}

// import { TimesheetProvider } from "path-to-context/TimesheetContext"
// use <TimesheetProvider> as a wrapper around the part you need the context for
function TimesheetProvider({ children }: { children: React.ReactNode }) {
	const [timesheet, setTimesheet] = React.useReducer(reducer, initialTimesheet)

	return (
		<TimesheetContext value={{ timesheet, setTimesheet }}>
			{children}
		</TimesheetContext>
	)
}

// import { useTimesheet } fron "path-to-context/TimesheetContext"
// within functional component
// const { sessionToken, ...TimesheetContext } = useTimesheet()
function useTimesheet(): TimesheetContextProps {
	const context = React.useContext(TimesheetContext)

	if (!context) {
		throw new Error('You should use useTimesheet within an TimesheetContext')
	}

	return context
}

export { TimesheetProvider, useTimesheet }
