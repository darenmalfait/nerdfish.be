import {
	Button,
	Dialog,
	TooltipContent,
	TooltipTrigger,
	Tooltip,
	TooltipProvider,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogTrigger,
} from '@repo/design-system/components/ui'
import { PlusIcon, PrinterIcon } from '@repo/design-system/icons'
import { cx } from '@repo/lib/utils/base'
import * as React from 'react'
import { useTimesheet } from '../timesheet-provider'
import { type TimeEntry } from '../utils'
import { ImportTimeEntriesButton } from './import-timesheets'
import { TimeEntryForm } from './time-entry-form'

function AddTimeEntryButton() {
	const { timesheet, setTimesheet } = useTimesheet()
	const [adding, setAdding] = React.useState<boolean>(false)

	const onAdd = React.useCallback(
		(data: TimeEntry) => {
			setTimesheet({ timeEntries: [...(timesheet.timeEntries ?? []), data] })
			return setAdding(false)
		},
		[timesheet, setTimesheet],
	)

	return (
		<Dialog open={adding} onOpenChange={setAdding}>
			<Tooltip>
				<TooltipTrigger asChild>
					<Button
						type="button"
						icon
						variant="ghost"
						aria-label="Add entry"
						asChild
					>
						<DialogTrigger>
							<PlusIcon className="h-4 w-4" />
						</DialogTrigger>
					</Button>
				</TooltipTrigger>
				<TooltipContent>Add a time entry</TooltipContent>
			</Tooltip>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Add Time Entry</DialogTitle>
					<DialogDescription>
						Add a new time entry to the timesheet
					</DialogDescription>
				</DialogHeader>
				<TimeEntryForm onSubmit={onAdd} />
			</DialogContent>
		</Dialog>
	)
}

export function Toolbar() {
	return (
		<div
			className={cx(
				'print:hidden',
				'rounded-container bg-popover p-xs fixed inset-x-0 z-50 mx-auto w-fit max-w-full',
				'before:empty-content before:rounded-container before:bg-background-muted/50 before:absolute before:inset-0',
				'bottom-lg',
			)}
		>
			<TooltipProvider>
				<ul className="gap-sm flex">
					<li>
						<AddTimeEntryButton />
					</li>
					<li>
						<ImportTimeEntriesButton />
					</li>
					<li>
						<Tooltip>
							<TooltipTrigger asChild>
								<Button
									type="button"
									variant="ghost"
									icon
									aria-label="Print"
									onClick={() => window.print()}
								>
									<PrinterIcon className="h-4 w-4" />
								</Button>
							</TooltipTrigger>
							<TooltipContent>Print</TooltipContent>
						</Tooltip>
					</li>
				</ul>
			</TooltipProvider>
		</div>
	)
}
