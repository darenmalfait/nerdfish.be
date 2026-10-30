'use client'

import {
	Children,
	useImperativeHandle,
	useRef,
	type ComponentProps,
} from 'react'
import { Slot } from '@radix-ui/react-slot'
import { useInView } from '@repo/lib/hooks/use-in-view'
import { cn } from '@repo/lib/utils/class'

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
				className={cn({
					'motion-preset-fade motion-translate-x-in-[0%] motion-translate-y-in-[100%] animation-duration-[800ms]':
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
	const isInView = useInView(componentRef, { once: true })
	const shouldAnimate = eager ?? isInView

	return (
		<Component ref={componentRef} className={className} {...props}>
			{/* eslint-disable-next-line @nerdfish/conventions/map-transformer-name, react-x/no-children-map -- staggers each child individually */}
			{Children.map(children, (child, index) => {
				const stagger = staggerDelay ? index * staggerDelay : 0
				const itemDelay = delay + stagger

				return (
					<TextSlideUpItem
						className={className}
						animate={shouldAnimate}
						delay={itemDelay}
					>
						{child}
					</TextSlideUpItem>
				)
			})}
		</Component>
	)
}
