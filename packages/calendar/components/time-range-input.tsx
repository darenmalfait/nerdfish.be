'use client'

import { useControllableState } from '@nerdfish/react/hooks/use-controllable-state'
import { inputVariants } from '@nerdfish/react/input'
import { ArrowRightIcon, ClockIcon } from '@repo/design-system/icons'
import { cn } from '@repo/lib/utils/class'
import { useMemo } from 'react'
import { differenceInMinutes, parse } from '../utils'

const hideTimeIconClass = '[&::-webkit-calendar-picker-indicator]:hidden'

export function TimeRangeInput({
	value: valueProp,
	onChange,
	className,
}: {
	value: { start: string; end: string }
	onChange: (value: { start: string; end: string }) => void
	className?: string
}) {
	const [value = { start: '', end: '' }, setValue] = useControllableState<{
		start: string
		end: string
	}>({
		prop: valueProp,
		defaultProp: {
			start: '',
			end: '',
		},
		onChange,
	})

	const duration = useMemo(() => {
		if (!value.start || !value.end) {
			return ''
		}

		const start = parse(value.start, 'HH:mm', new Date())
		const end = parse(value.end, 'HH:mm', new Date())
		const diff = differenceInMinutes(end, start)
		const hours = Math.floor(diff / 60)
		const minutes = diff % 60
		return `${hours}h ${minutes}min`
	}, [value.start, value.end])

	return (
		<div
			className={cn(
				inputVariants(),
				'gap-best-friends flex items-center',
				className,
			)}
		>
			<div className="space-x-sm flex flex-1 items-center">
				<ClockIcon className="text-foreground-muted size-4" />
				<input
					type="time"
					value={value.start}
					onChange={(e) => setValue({ ...value, start: e.target.value })}
					className={cn(
						'bg-transparent text-sm focus:outline-none',
						hideTimeIconClass,
					)}
				/>
			</div>
			<div className="mx-4 flex shrink-0 items-center justify-center">
				<ArrowRightIcon className="text-foreground-muted size-4" />
			</div>
			<div className="space-x-friends flex flex-1 items-center justify-end">
				<input
					type="time"
					value={value.end}
					onChange={(e) => setValue({ ...value, end: e.target.value })}
					className={cn(
						'bg-transparent text-sm focus:outline-none',
						hideTimeIconClass,
					)}
				/>
				<span className="text-muted text-xs font-normal">{duration}</span>
			</div>
		</div>
	)
}
