// Thanks to Rafaël Mindreau for the inspiration 🙏
'use client'

import { secondsToHoursAndMinutes } from '@repo/calendar/utils'
import {
	DialogTrigger,
	Dialog,
	Separator,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	Field,
	Label,
	Input,
} from '@repo/design-system/components/ui'
import { Logo } from '@repo/design-system/icons'
import { cx } from '@repo/lib/utils/base'
import { useEffect, useRef, useMemo, useState } from 'react'
import { type TimesheetsRecord } from '../schemas'

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
		<div className="group flex items-center">
			<div className={cx('mr-lg', className)}>{day}</div>
			<div className={cx('flex flex-1 justify-end', className)}>{hours}</div>
		</div>
	)
}

function TimeEntries({ timeEntries }: { timeEntries?: TimesheetsRecord[] }) {
	const groupedEntries = useMemo(() => {
		if (!timeEntries) return {}
		return timeEntries
			.sort((a, b) => {
				const aDay = new Date(a.start)
				const bDay = new Date(b.start)
				return aDay.getTime() - bDay.getTime()
			})
			.reduce<Record<string, TimesheetsRecord[]>>((acc, entry) => {
				const project = entry.project ?? ''
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
								key={`${entry.start}${i}-${j}}`}
								day={new Date(entry.start).toLocaleDateString('nl-BE', {
									day: '2-digit',
									month: '2-digit',
									year: 'numeric',
								})}
								hours={secondsToHoursAndMinutes(entry.duration).toString()}
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

function Spacer() {
	return (
		<Row
			day="------------------"
			hours="------"
			className="text-foreground-muted"
		/>
	)
}

export function TimesheetsContent({
	timeEntries,
}: {
	timeEntries: TimesheetsRecord[]
}) {
	const [invoiceRef, setInvoiceRef] = useState<string>('')
	return (
		<div>
			<div className="mb-lg gap-sm flex flex-col items-start justify-start">
				<Logo className="h-6 w-auto" />
			</div>

			<div className="mb-lg gap-xs flex flex-col items-start justify-start">
				<h1 className="text-xl font-bold uppercase">Timesheets</h1>

				<Dialog>
					<DialogTrigger>
						<div
							className={cx('text-sm', {
								'rounded-base bg-background-danger p-sm text-foreground-danger-contrast print:hidden':
									!invoiceRef,
							})}
						>
							REF: {invoiceRef.length ? invoiceRef : 'SET INVOICE REFERENCE'}
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
								value={invoiceRef}
								onChange={(e) => setInvoiceRef(e.target.value)}
							/>
						</Field>
					</DialogContent>
				</Dialog>
			</div>

			<div className="mb-lg gap-xs flex flex-col">
				<Row day="DAY" hours="HOURS" />
				<Spacer />

				<TimeEntries timeEntries={timeEntries} />

				<Spacer />
				<Row
					day="TOTAL HOURS"
					hours={
						timeEntries.length > 0
							? secondsToHoursAndMinutes(
									timeEntries.reduce((acc, entry) => acc + entry.duration, 0),
								).toString()
							: '0'
					}
					className="font-bold"
				/>

				<Row
					day="TOTAL DAYS"
					hours={timeEntries.length > 0 ? timeEntries.length.toString() : '0'}
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

export function TimesheetsPrint({
	timeEntries,
}: {
	timeEntries: TimesheetsRecord[]
}) {
	const ref = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (ref.current) {
			// get height in mm
			// 1 pixel (X) = 0.2645833333 mm
			const height = ref.current.clientHeight * 0.2645833333
			const style = document.createElement('style')
			style.innerHTML = `@page {size: 80mm ${height}mm}`
			document.head.appendChild(style)
		}
	}, [timeEntries, ref])

	return (
		<div className="p-md pb-3xl print:p-0">
			<div className="mx-auto w-[80mm] print:[box-shadow:none]">
				<div
					ref={ref}
					className="rounded-base p-md pb-lg shadow-outline relative"
				>
					<TimesheetsContent timeEntries={timeEntries} />
				</div>
			</div>
		</div>
	)
}
