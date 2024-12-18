'use client'

import { cx } from '@nerdfish/utils'
import { Slot } from '@radix-ui/react-slot'
import { useInView } from 'motion/react'
import * as React from 'react'

interface TextSlideUpItemProps extends React.ComponentProps<'div'> {
	delay?: number
	animate?: boolean
}

function TextSlideUpItem({
	children,
	delay,
	animate,
	className,
	...props
}: TextSlideUpItemProps) {
	return (
		<div className={className} {...props}>
			<div
				className={cx({
					'motion-preset-fade motion-translate-x-in-[0%] motion-translate-y-in-[100%] [animation-duration:800ms]':
						animate,
					invisible: !animate,
				})}
				style={{ animationDelay: delay ? `${delay}ms` : undefined }}
			>
				{children}
			</div>
		</div>
	)
}

export interface TextSlideUpProps extends React.ComponentProps<'div'> {
	staggerDelay?: number
	delay?: number
	asChild?: boolean
	eager?: boolean
}

export function TextSlideUp({
	children,
	staggerDelay = 200,
	delay = 0,
	asChild = false,
	eager,
	className,
	ref,
	...props
}: TextSlideUpProps) {
	const componentRef = React.useRef<HTMLDivElement>(null)
	React.useImperativeHandle(ref, () => componentRef.current as HTMLDivElement)

	const inView = useInView(componentRef, { once: true })

	const animate = eager ?? inView

	const Component = asChild ? Slot : 'div'
	return (
		<Component ref={componentRef} className={className} {...props}>
			{React.Children.map(children, (child, index) => {
				const stagger = staggerDelay ? index * staggerDelay : 0
				const itemDelay = delay + stagger

				return (
					<TextSlideUpItem
						className={className}
						animate={animate}
						delay={itemDelay}
					>
						{child}
					</TextSlideUpItem>
				)
			})}
		</Component>
	)
}
