// Thanks to Rafaël Mindreau for the inspiration 🙏
'use client'

import {
	Button,
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	Field,
	Input,
	Label,
	Separator,
} from '@nerdfish/ui'
import { cx } from '@nerdfish/utils'
import { Logo } from '@nerdfish-website/ui/icons'
import { CSVImporter } from 'csv-import-react'
import * as React from 'react'
import { z } from 'zod'

function Row({
	day,
	hours,
	className,
}: {
	day: string
	hours: string
	className?: string
}) {
	return (
		<>
			<div className={cx('col-span-2', className)}>{day}</div>
			<div className={cx('col-span-1', className)}>{hours}</div>
		</>
	)
}

function Spacer() {
	return <Row day="------------------" hours="-------" className="text-muted" />
}

const timeEntrySchema = z.object({
	// short format
	day: z.preprocess(
		(a) =>
			new Date(z.string().parse(a)).toLocaleDateString('nl-BE', {
				day: '2-digit',
				month: '2-digit',
				year: 'numeric',
			}),
		z.string(),
	),
	// it's using comma notion
	hours: z.preprocess((a) => parseInt(z.string().parse(a), 10), z.number()),
	project: z.string(),
})

type TimeEntry = z.infer<typeof timeEntrySchema>

function TimeEntries({ timeEntries }: { timeEntries?: TimeEntry[] }) {
	const groupedEntries = React.useMemo(() => {
		if (!timeEntries) return {}
		return timeEntries.reduce<Record<string, TimeEntry[]>>((acc, entry) => {
			const project = entry.project
			if (!acc[project]) {
				acc[project] = []
			}
			acc[project].push(entry)
			return acc
		}, {})
	}, [timeEntries])

	if (!timeEntries) return null

	return (
		<>
			{Object.entries(groupedEntries).map(([project, entries], i) => {
				return (
					<>
						<div className="col-span-3" key={project}>
							{project}
						</div>
						{entries.map((entry) => (
							<Row
								key={entry.day}
								day={entry.day}
								hours={entry.hours.toString()}
							/>
						))}
						{i < Object.keys(groupedEntries).length - 1 ? <Spacer /> : null}
					</>
				)
			})}
		</>
	)
}

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

function LoadTimeEntries({
	setTimeEntries,
	timeEntries,
}: {
	setTimeEntries: (timeEntries?: TimeEntry[]) => void
	timeEntries?: TimeEntry[]
}) {
	const [open, setOpen] = React.useState<boolean>(false)
	const onComplete = React.useCallback(
		(data: { rows: { values: any }[] }) => {
			const entries = data.rows.map((row) => timeEntrySchema.parse(row.values))

			// last line is totals
			return setTimeEntries(entries.slice(0, -1))
		},
		[setTimeEntries],
	)

	if (timeEntries) return null

	return (
		<div className="col-span-3">
			<Button onClick={() => setOpen(true)} type="button">
				Load Time Entries
			</Button>
			<CSVImporter
				modalIsOpen={open}
				modalOnCloseTriggered={() => setOpen(false)}
				className="w-full"
				onComplete={onComplete}
				template={template}
			/>
		</div>
	)
}

export function TimesheetGenerator() {
	const ref = React.useRef<HTMLDivElement>(null)

	const [invoiceReference, setInvoiceReference] = React.useState<string>()
	const [person, setPerson] = React.useState<string | undefined>(
		'Daren Malfait',
	)
	const [timeEntries, setTimeEntries] = React.useState<
		TimeEntry[] | undefined
	>()

	React.useEffect(() => {
		if (ref.current) {
			// get height in mm
			const height = (ref.current.clientHeight * 25.4) / 96
			const style = document.createElement('style')
			style.innerHTML = `@page {size: 80mm ${height}mm}`
			document.head.appendChild(style)
		}
	}, [invoiceReference, timeEntries])

	return (
		<div ref={ref} className="p-md outline-shadow w-[80mm]">
			<div className="gap-sm mb-lg flex flex-col items-start justify-start">
				<Logo className="h-4 w-auto" />
				<Dialog>
					<DialogTrigger>
						<div
							className={cx('text-sm', {
								'text-danger': !person,
							})}
						>
							{person ?? 'SET PERSON'}
						</div>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Person</DialogTitle>
						</DialogHeader>

						<Field className="w-full">
							<Label htmlFor="person">Person</Label>
							<Input
								id="person"
								value={person}
								onChange={(e) => setPerson(e.target.value)}
							/>
						</Field>
					</DialogContent>
				</Dialog>
			</div>

			<div className="gap-xs mb-lg flex flex-col items-start justify-start">
				<h1 className="text-xl font-bold uppercase">Timesheets</h1>
				<Dialog>
					<DialogTrigger>
						<div
							className={cx('text-sm', {
								'text-danger': !invoiceReference,
							})}
						>
							REF: {invoiceReference ?? 'SET INVOICE REFERENCE'}
						</div>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Invoice Reference</DialogTitle>
						</DialogHeader>

						<Field className="w-full">
							<Label htmlFor="invoice-reference">Invoice Reference</Label>
							<Input
								id="invoice-reference"
								value={invoiceReference}
								onChange={(e) => setInvoiceReference(e.target.value)}
							/>
						</Field>
					</DialogContent>
				</Dialog>
			</div>

			<div className="gap-y-xs gap-x-lg mb-lg grid grid-cols-3">
				<Row day="DAY" hours="HOURS" />
				<Spacer />
				<LoadTimeEntries
					setTimeEntries={setTimeEntries}
					timeEntries={timeEntries}
				/>
				<TimeEntries timeEntries={timeEntries} />
				<Spacer />
				<Row
					day="TOTAL HOURS"
					hours={
						timeEntries
							? timeEntries
									.reduce((acc, entry) => acc + entry.hours, 0)
									.toString()
							: '0'
					}
					className="font-bold"
				/>
				<Row
					day="TOTAL DAYS"
					hours={timeEntries ? timeEntries.length.toString() : '0'}
					className="font-bold"
				/>
			</div>

			<div className="text-muted mb-lg text-center text-sm">
				*** END OF TIMESHEET ***
			</div>
			<Separator className="my-md" />
			<div className="flex flex-col items-center">
				<Logo className="mb-md h-4 w-auto" />
				<div className="text-muted text-sm">Daren Malfait BV</div>
				<div className="text-muted text-sm">BE0794123756</div>
				<div className="text-muted text-sm">daren@nerdfish.be</div>
			</div>
		</div>
	)
}
