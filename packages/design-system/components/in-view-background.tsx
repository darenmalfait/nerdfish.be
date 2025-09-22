'use client'

import { cx } from '@repo/lib/utils/base'
import { useInView } from 'motion/react'
import {
	useImperativeHandle,
	useRef,
	type ComponentProps,
	type ReactNode,
} from 'react'

export interface InViewBackgroundProps extends ComponentProps<'div'> {
	children: ReactNode
	className?: string
}

export function InViewBackground({
	children,
	className = 'bg-background-muted',
	ref,
	...rest
}: InViewBackgroundProps) {
	const refObject = useRef<HTMLDivElement>(null)
	useImperativeHandle(ref, () => refObject.current as HTMLInputElement)

	const isInView = useInView(refObject, { amount: 0.6 })

	return (
		<div className="relative" ref={refObject}>
			<div
				className={cx(
					className,
					'-z-1 fixed inset-0 overflow-hidden rounded-none opacity-0 duration-500',
					isInView && 'opacity-100',
				)}
				{...rest}
			/>
			{children}
		</div>
	)
}
