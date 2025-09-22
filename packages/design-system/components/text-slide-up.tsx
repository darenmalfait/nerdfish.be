'use client'

import { Slot } from '@radix-ui/react-slot'
import { cx } from '@repo/lib/utils/base'
import { useInView } from 'motion/react'
import {
	Children,
	useImperativeHandle,
	useRef,
	type ComponentProps,
} from 'react'

interface TextSlideUpItemProps extends ComponentProps<'div'> {
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

export interface TextSlideUpProps extends ComponentProps<'div'> {
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
	const componentRef = useRef<HTMLDivElement>(null)
	useImperativeHandle(ref, () => componentRef.current as HTMLDivElement)

	const Component = asChild ? Slot : 'div'
	const inView = useInView(componentRef, { once: true })
	const animate = eager ?? inView

	return (
		<Component ref={componentRef} className={className} {...props}>
			{Children.map(children, (child, index) => {
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
