// Thanks to Rafaël Mindreau for the inspiration 🙏
'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import {
	Button,
	DateTimePicker,
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	Field,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Input,
	Label,
	Separator,
} from '@nerdfish/ui'
import { cx } from '@nerdfish/utils'
import { nonNullable } from '@nerdfish-website/lib/utils'
import { ImportIcon, Logo, PlusIcon, XIcon } from '@nerdfish-website/ui/icons'
import dynamic from 'next/dynamic'
import * as React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const CSVImporter = dynamic(
	() => import('csv-import-react').then((mod) => mod.CSVImporter),
	{
		ssr: false,
	},
)

function Row({
	day,
	hours,
	className,
	onRemove,
}: {
	day: string
	hours: string
	className?: string
	onRemove?: () => void
}) {
	return (
		<div className="group flex items-center">
			<div className={cx('mr-lg', className)}>{day}</div>
			<div className={cx('flex flex-1 justify-end', className)}>{hours}</div>
			{onRemove ? (
				<div className="group-hover:ml-sm w-0 overflow-hidden transition-all group-hover:w-8 print:hidden">
					<Button
						type="button"
						onClick={onRemove}
						variant="ghost"
						size="iconSm"
						aria-label="Remove entry"
					>
						<XIcon className="h-4 w-4" />
					</Button>
				</div>
			) : null}
		</div>
	)
}

function Spacer() {
	return <Row day="------------------" hours="-------" className="text-muted" />
}

const timeEntrySchema = z.object({
	day: z.date(),
	hours: z.number().min(0),
	project: z.string(),
})

type TimeEntry = z.infer<typeof timeEntrySchema>

function TimeEntries({
	timeEntries,
	setTimeEntries,
}: {
	timeEntries?: TimeEntry[]
	setTimeEntries: (timeEntries?: TimeEntry[]) => void
}) {
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
								key={entry.day.toLocaleDateString()}
								day={entry.day.toLocaleDateString('nl-BE', {
									day: '2-digit',
									month: '2-digit',
									year: 'numeric',
								})}
								hours={entry.hours.toString()}
								onRemove={() => {
									setTimeEntries(timeEntries.filter((e) => e !== entry))
								}}
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

function AddTimeEntryForm({
	onSubmit,
}: {
	onSubmit: (data: TimeEntry) => void
}) {
	const form = useForm<TimeEntry>({
		resolver: zodResolver(timeEntrySchema),
		defaultValues: {
			project: '',
			day: new Date(),
			hours: 8,
		},
	})

	return (
		<Form {...form}>
			<form noValidate onSubmit={form.handleSubmit(onSubmit)}>
				<fieldset className="space-y-md">
					<FormField
						control={form.control}
						name="project"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel>Project</FormLabel>

								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="day"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Day</FormLabel>
								<FormControl>
									<DateTimePicker {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="hours"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Hours</FormLabel>
								<FormControl>
									<Input type="number" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<Button type="submit">Add</Button>
				</fieldset>
			</form>
		</Form>
	)
}

function AddTimeEntries({
	setTimeEntries,
	timeEntries,
}: {
	setTimeEntries: (timeEntries?: TimeEntry[]) => void
	timeEntries?: TimeEntry[]
}) {
	const [importing, setImporting] = React.useState<boolean>(false)
	const [adding, setAdding] = React.useState<boolean>(false)
	const onComplete = React.useCallback(
		(data: { rows: { values: any }[] }) => {
			setImporting(false)

			return setTimeEntries(
				nonNullable(
					data.rows.map((row) => {
						const day = new Date(row.values.day)
						const hours = parseFloat(row.values.hours)

						const result = timeEntrySchema.safeParse({
							day,
							hours,
							project: row.values.project,
						})

						return result.success ? result.data : null
					}),
				),
			)
		},
		[setTimeEntries],
	)

	const onAdd = React.useCallback(
		(data: TimeEntry) => {
			setTimeEntries([...(timeEntries ?? []), data])
			return setAdding(false)
		},
		[setAdding, setTimeEntries, timeEntries],
	)

	return (
		<div className="my-md flex items-center justify-center print:hidden">
			<div className="gap-sm flex">
				<Dialog open={adding} onOpenChange={setAdding}>
					<DialogTrigger asChild>
						<Button
							type="button"
							size="icon"
							className="group transition-all"
							aria-label="Add entry"
						>
							<PlusIcon className="h-4 w-4" />
						</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Add Time Entry</DialogTitle>
							<DialogDescription>
								Add a new time entry to the timesheet
							</DialogDescription>
						</DialogHeader>
						<AddTimeEntryForm onSubmit={onAdd} />
					</DialogContent>
				</Dialog>
				<Button
					variant="outline"
					onClick={() => setImporting(true)}
					className="group transition-all"
					aria-label="Import Time Entries"
					type="button"
				>
					<ImportIcon className="h-4 w-4" />
				</Button>
			</div>
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
		<div ref={ref} className="p-md outline-shadow mx-auto w-[80mm]">
			<div className="gap-sm mb-lg flex flex-col items-start justify-start">
				<Logo className="h-4 w-auto" />
				<Dialog>
					<DialogTrigger>
						<div
							className={cx('text-sm', {
								'p-sm bg-danger text-danger rounded-base print:hidden': !person,
							})}
						>
							{person?.length ? person : 'SET PERSON'}
						</div>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Person</DialogTitle>
							<DialogDescription>
								Who is working on this timesheet?
							</DialogDescription>
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
								'p-sm bg-danger text-danger rounded-base print:hidden':
									!invoiceReference,
							})}
						>
							REF:{' '}
							{invoiceReference?.length
								? invoiceReference
								: 'SET INVOICE REFERENCE'}
						</div>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Invoice Reference</DialogTitle>
							<DialogDescription>
								What invoice is this timesheet referring to?
							</DialogDescription>
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

			<div className="gap-xs mb-lg flex flex-col">
				<Row day="DAY" hours="HOURS" />
				<Spacer />

				<TimeEntries
					timeEntries={timeEntries}
					setTimeEntries={setTimeEntries}
				/>

				<AddTimeEntries
					setTimeEntries={setTimeEntries}
					timeEntries={timeEntries}
				/>

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
