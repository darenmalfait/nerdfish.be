import { differenceInSeconds, format, formatISO } from '@repo/calendar/utils'
import {
	Button,
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from '@repo/design-system/components/ui'

import { ImportIcon } from '@repo/design-system/icons'
import dynamic from 'next/dynamic'
import { useCallback, useState } from 'react'
import { useTimesheets } from '../providers/timesheets-provider'

const CSVImporter = dynamic(
	() => import('csv-import-react').then((mod) => mod.CSVImporter),
	{
		ssr: false,
	},
)

const template = {
	columns: [
		{
			name: 'Started At',
			key: 'started_at',
			required: true,
			suggested_mappings: ['started_at'],
			description: 'The time the work started',
		},
		{
			name: 'Ended At',
			key: 'ended_at',
			required: true,
			suggested_mappings: ['ended_at'],
			description: 'The time the work ended',
		},
		{
			name: 'Project',
			key: 'project',
			description: 'The project name',
			suggested_mappings: ['project'],
		},
	],
}

export function ImportTimeEntriesButton() {
	const { onImportEvents } = useTimesheets()
	const [importing, setImporting] = useState<boolean>(false)

	const onComplete = useCallback(
		async (data: {
			rows: {
				values: {
					started_at: string
					ended_at: string
					project: string
				}
			}[]
		}) => {
			setImporting(false)

			const entries = []

			for (const row of data.rows) {
				if (!row.values.started_at.length || !row.values.ended_at.length)
					continue

				const date = new Date(row.values.started_at).toISOString()
				const selectedDate = formatISO(date, { representation: 'date' })

				// get the time from the date in format HH:mm
				const start = format(new Date(row.values.started_at), 'HH:mm')
				const end = format(new Date(row.values.ended_at), 'HH:mm')

				const duration = differenceInSeconds(
					new Date(row.values.ended_at),
					new Date(row.values.started_at),
				)

				const newEvent = {
					values: {
						duration,
						start,
						end,
						project: row.values.project,
					},
					selectedDate,
					range: [selectedDate],
				}

				entries.push(newEvent)
			}

			await onImportEvents(entries)

			return {
				success: true,
			}
		},
		[onImportEvents],
	)

	return (
		<div className="inline-block">
			<Tooltip>
				<Button
					variant="default"
					onClick={() => setImporting(true)}
					className="group transition-all"
					aria-label="Import Time Entries"
					type="button"
					icon
					asChild
				>
					<TooltipTrigger>
						<ImportIcon className="size-4" />
					</TooltipTrigger>
				</Button>
				<TooltipContent>Import time entries</TooltipContent>
			</Tooltip>
			<CSVImporter
				modalIsOpen={importing}
				modalOnCloseTriggered={() => setImporting(false)}
				className="w-full"
				onComplete={onComplete}
				template={template}
			/>
		</div>
	)
}
