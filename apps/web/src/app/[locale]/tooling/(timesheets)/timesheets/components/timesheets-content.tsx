import {
	Separator,
	DialogDescription,
	DialogHeader,
	Field,
	Input,
	Label,
	DialogContent,
	DialogTitle,
	Dialog,
	DialogTrigger,
	Button,
} from '@repo/design-system/components/ui'
import { Logo, PencilIcon, XIcon } from '@repo/design-system/icons'
import { cx } from '@repo/lib/utils/base'
import * as React from 'react'
import { useTimesheet } from '../timesheet-provider'
import { type TimeEntry } from '../utils'
import { TimeEntryForm } from './time-entry-form'

function RowActions({
	entry,
	onRemove,
	onEdit,
}: {
	entry?: TimeEntry
	onRemove?: () => void
	onEdit?: (entry: TimeEntry) => void
}) {
	if (!onEdit && !onRemove) return null

	return (
		<div className="group-hover:ml-md gap-xs flex delay-200">
			{onEdit && entry ? (
				<div className="gap-xs flex w-0 items-center overflow-hidden transition-all delay-200 ease-out group-hover:w-8 print:hidden">
					<EditTimeEntryButton entry={entry} onEdit={onEdit} />
				</div>
			) : null}
			{onRemove ? (
				<div className="gap-xs flex w-0 items-center overflow-hidden transition-all delay-200 ease-out group-hover:w-8 print:hidden">
					<Button
						type="button"
						onClick={onRemove}
						variant="danger"
						size="sm"
						icon
						aria-label="Remove entry"
					>
						<XIcon className="h-4 w-4" />
					</Button>
				</div>
			) : null}
		</div>
	)
}

function Row({
	entry,
	day,
	hours,
	className,
	onRemove,
	onEdit,
}: {
	day: string
	entry?: TimeEntry
	hours: string
	className?: string
	onRemove?: () => void
	onEdit?: (entry: TimeEntry) => void
}) {
	return (
		<div className="group flex items-center">
			<div className={cx('mr-lg', className)}>{day}</div>
			<div className={cx('flex flex-1 justify-end', className)}>{hours}</div>
			<RowActions entry={entry} onRemove={onRemove} onEdit={onEdit} />
		</div>
	)
}

function TimeEntries({
	timeEntries,
	setTimeEntries,
}: {
	timeEntries?: TimeEntry[]
	setTimeEntries: (timeEntries?: TimeEntry[]) => void
}) {
	const groupedEntries = React.useMemo(() => {
		if (!timeEntries) return {}
		return timeEntries
			.sort((a, b) => a.day.getTime() - b.day.getTime())
			.reduce<Record<string, TimeEntry[]>>((acc, entry) => {
				const project = entry.project
				acc[project] ??= []
				acc[project].push(entry)
				return acc
			}, {})
	}, [timeEntries])

	if (!timeEntries) return null

	return (
		<>
			{Object.entries(groupedEntries).map(([project, entries], i) => {
				return (
					<div key={`${project}-${i}`}>
						<div className="col-span-3">{project}</div>
						{entries.map((entry, j) => (
							<Row
								entry={entry}
								key={`${entry.day.toLocaleDateString()}${i}-${j}}`}
								day={entry.day.toLocaleDateString('nl-BE', {
									day: '2-digit',
									month: '2-digit',
									year: 'numeric',
								})}
								hours={entry.hours.toString()}
								onEdit={(updatedEntry) => {
									setTimeEntries(
										timeEntries.map((currentEntry) =>
											currentEntry.id === entry.id
												? updatedEntry
												: currentEntry,
										),
									)
								}}
								onRemove={() => {
									setTimeEntries(timeEntries.filter((e) => e.id !== entry.id))
								}}
							/>
						))}
						{i < Object.keys(groupedEntries).length - 1 ? (
							<Spacer key={project} />
						) : null}
					</div>
				)
			})}
		</>
	)
}

function EditTimeEntryButton({
	entry,
	onEdit,
}: {
	entry: TimeEntry
	onEdit: (entry: TimeEntry) => void
}) {
	const [editing, setEditing] = React.useState<boolean>(false)

	const onSubmit = React.useCallback(
		(data: TimeEntry) => {
			setEditing(false)
			onEdit(data)
		},
		[onEdit],
	)

	return (
		<Dialog open={editing} onOpenChange={setEditing}>
			<Button
				type="button"
				variant="secondary"
				icon
				size="sm"
				aria-label="Edit entry"
				asChild
			>
				<DialogTrigger>
					<PencilIcon className="h-4 w-4" />
				</DialogTrigger>
			</Button>

			<DialogContent>
				<DialogHeader>
					<DialogTitle>Add Time Entry</DialogTitle>
					<DialogDescription>
						Add a new time entry to the timesheet
					</DialogDescription>
				</DialogHeader>
				<TimeEntryForm initialValues={entry} onSubmit={onSubmit} />
			</DialogContent>
		</Dialog>
	)
}

function Spacer() {
	return (
		<Row
			day="------------------"
			hours="------"
			className="text-foreground-muted"
		/>
	)
}

export function TimesheetsContent() {
	const { timesheet, setTimesheet } = useTimesheet()
	const { person, invoiceReference, timeEntries } = timesheet

	return (
		<div>
			<div className="mb-lg gap-sm flex flex-col items-start justify-start">
				<Logo className="h-6 w-auto" />
				<Dialog>
					<DialogTrigger>
						<div
							className={cx('text-sm', {
								'rounded-base bg-background-danger p-sm text-foreground-danger-contrast print:hidden':
									!person,
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
								onChange={(e) => setTimesheet({ person: e.target.value })}
							/>
						</Field>
					</DialogContent>
				</Dialog>
			</div>

			<div className="mb-lg gap-xs flex flex-col items-start justify-start">
				<h1 className="text-xl font-bold uppercase">Timesheets</h1>
				<Dialog>
					<DialogTrigger>
						<div
							className={cx('text-sm', {
								'rounded-base bg-background-danger p-sm text-foreground-danger-contrast print:hidden':
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
								onChange={(e) =>
									setTimesheet({ invoiceReference: e.target.value })
								}
							/>
						</Field>
					</DialogContent>
				</Dialog>
			</div>

			<div className="mb-lg gap-xs flex flex-col">
				<Row day="DAY" hours="HOURS" />
				<Spacer />

				<TimeEntries
					timeEntries={timeEntries}
					setTimeEntries={(updatedTimeEntries) =>
						setTimesheet({ timeEntries: updatedTimeEntries })
					}
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

			<div className="text-foreground-muted text-center text-sm">
				*** END OF TIMESHEET ***
			</div>
			<Separator className="my-lg" />
			<div className="flex flex-col items-center">
				<Logo className="mb-md h-4 w-auto" />
				<div className="text-foreground-muted text-sm">Daren Malfait BV</div>
				<div className="text-foreground-muted text-sm">BE0794123756</div>
				<div className="text-foreground-muted text-sm">daren@nerdfish.be</div>
			</div>
		</div>
	)
}
