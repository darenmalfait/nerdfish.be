'use client'

import { cx } from '@nerdfish/utils'
import { useInView } from 'motion/react'
import * as React from 'react'

export const InViewBackground = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ children, className = 'bg-muted', ...rest }, ref) => {
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
})

InViewBackground.displayName = 'InViewBackground'
