import { useCallback, useMemo, useState } from 'react'
import { Button } from '@nerdfish/react/button'
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from '@nerdfish/react/tooltip'
import { ImportIcon } from 'lucide-react'
import dynamic from 'next/dynamic'

import { differenceInSeconds, format, formatISO } from '@repo/calendar/utils'
import { useTranslations } from '@repo/i18n/client'

import { useTimesheets } from '../providers/timesheets-provider'

const CSVImporter = dynamic(
	() => import('csv-import-react').then((mod) => mod.CSVImporter),
	{
		ssr: false,
	},
)

export function ImportTimeEntriesButton() {
	const t = useTranslations('timesheets.import')
	const { onImportEvents } = useTimesheets()
	const template = useMemo(
		() => ({
			columns: [
				{
					name: t('columns.startedAt.name'),
					key: 'started_at',
					required: true,
					suggested_mappings: ['started_at'],
					description: t('columns.startedAt.description'),
				},
				{
					name: t('columns.endedAt.name'),
					key: 'ended_at',
					required: true,
					suggested_mappings: ['ended_at'],
					description: t('columns.endedAt.description'),
				},
				{
					name: t('columns.project.name'),
					key: 'project',
					description: t('columns.project.description'),
					suggested_mappings: ['project'],
				},
			],
		}),
		[t],
	)
	const [importing, setImporting] = useState<boolean>(false)

	const handleComplete = useCallback(
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
					className="group rounded-[calc(var(--radius-container)-theme(padding.bff))]!"
					aria-label={t('label')}
					type="button"
					icon
					render={
						<TooltipTrigger>
							<ImportIcon className="size-4" />
						</TooltipTrigger>
					}
				/>
				<TooltipContent>{t('label')}</TooltipContent>
			</Tooltip>
			<CSVImporter
				modalIsOpen={importing}
				modalOnCloseTriggered={() => setImporting(false)}
				className="w-full"
				onComplete={handleComplete}
				template={template}
			/>
		</div>
	)
}
