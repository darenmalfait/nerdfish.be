'use client'

import { cx } from '@repo/lib/utils/base'
import { useInView } from 'motion/react'
import * as React from 'react'

export interface InViewBackgroundProps extends React.ComponentProps<'div'> {
	children: React.ReactNode
	className?: string
}

export function InViewBackground({
	children,
	className = 'bg-muted',
	ref,
	...rest
}: InViewBackgroundProps) {
	const refObject = React.useRef<HTMLDivElement>(null)
	React.useImperativeHandle(ref, () => refObject.current as HTMLInputElement)

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
