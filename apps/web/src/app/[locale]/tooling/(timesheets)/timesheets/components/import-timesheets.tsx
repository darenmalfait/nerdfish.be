import {
	Button,
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from '@repo/design-system/components/ui'

import { ImportIcon } from '@repo/design-system/icons'
import { nonNullable } from '@repo/lib/utils/array'
import dynamic from 'next/dynamic'
import * as React from 'react'
import { useTimesheet } from '../timesheet-provider'
import { getCrypto } from '../utils'

const CSVImporter = dynamic(
	() => import('csv-import-react').then((mod) => mod.CSVImporter),
	{
		ssr: false,
	},
)

const template = {
	columns: [
		{
			name: 'Day',
			key: 'day',
			required: true,
			suggested_mappings: ['started_at'],
			description: 'The day of the week',
		},
		{
			name: 'Hours',
			key: 'hours',
			required: true,
			suggested_mappings: ['hours'],
			description: 'The number of hours worked',
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
	const { setTimesheet } = useTimesheet()
	const [importing, setImporting] = React.useState<boolean>(false)

	const onComplete = React.useCallback(
		(data: {
			rows: { values: { day: string; hours: string; project: string } }[]
		}) => {
			setImporting(false)

			return setTimesheet({
				timeEntries: nonNullable(
					data.rows.map((row) => {
						if (!row.values.day || !row.values.hours) return null

						return {
							id: getCrypto().randomUUID(),
							day: new Date(row.values.day),
							hours: Number(row.values.hours.replace(',', '.')),
							project: row.values.project,
						}
					}),
				),
			})
		},
		[setTimesheet],
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
