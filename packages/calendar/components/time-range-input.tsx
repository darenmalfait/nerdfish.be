'use client'

import { inputVariants } from '@repo/design-system/components/ui'
import { ArrowRightIcon, ClockIcon } from '@repo/design-system/icons'
import { cx } from '@repo/lib/utils/base'
import * as React from 'react'
import { differenceInMinutes, parse } from '../utils'

const hideTimeIconClass = '[&::-webkit-calendar-picker-indicator]:hidden'

export function TimeRangeInput({
	value,
	onChange,
	className,
}: {
	value: { start: string; end: string }
	onChange: (value: { start: string; end: string }) => void
	className?: string
}) {
	const [startTime, setStartTime] = React.useState(value.start)
	const [endTime, setEndTime] = React.useState(value.end)
	const [duration, setDuration] = React.useState('')

	React.useEffect(() => {
		setStartTime(value.start)
		setEndTime(value.end)
	}, [value])

	React.useEffect(() => {
		if (!startTime || !endTime) {
			return
		}

		const start = parse(startTime, 'HH:mm', new Date())
		const end = parse(endTime, 'HH:mm', new Date())
		const diff = differenceInMinutes(end, start)
		const hours = Math.floor(diff / 60)
		const minutes = diff % 60
		setDuration(`${hours}h ${minutes}min`)
	}, [startTime, endTime])

	return (
		<div className={cx(inputVariants(), 'gap-sm flex items-center', className)}>
			<div className="space-x-sm flex flex-1 items-center">
				<ClockIcon className="text-muted size-4" />
				<input
					type="time"
					value={startTime}
					onChange={(e) => {
						setStartTime(e.target.value)
						onChange({ ...value, start: e.target.value })
					}}
					className={cx(
						'bg-transparent text-sm focus:outline-none',
						hideTimeIconClass,
					)}
				/>
			</div>
			<div className="mx-4 flex flex-shrink-0 items-center justify-center">
				<ArrowRightIcon className="text-muted size-4" />
			</div>
			<div className="flex flex-1 items-center justify-end space-x-2">
				<input
					type="time"
					value={endTime}
					onChange={(e) => {
						setEndTime(e.target.value)
						onChange({ ...value, end: e.target.value })
					}}
					className={cx(
						'bg-transparent text-sm focus:outline-none',
						hideTimeIconClass,
					)}
				/>
				<span className="text-muted text-sm">{duration}</span>
			</div>
		</div>
	)
}
