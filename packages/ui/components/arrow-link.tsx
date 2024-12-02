'use client'

import { cx } from '@nerdfish/utils'
import {
	type ElementState,
	useElementState,
} from '@repo/lib/utils/use-element-state'
import { type Variant, motion } from 'motion/react'
import type * as React from 'react'
import { ArrowIcon, type ArrowIconProps } from '../icons'
import { Link } from './link'

const arrowVariants: Record<
	ArrowIconProps['direction'],
	Record<ElementState, Variant>
> = {
	up: {
		initial: { y: 0 },
		hover: { y: -8 },
		focus: {
			y: [0, -8, 0],
			transition: { repeat: Number.POSITIVE_INFINITY },
		},
		active: { y: -24 },
	},
	right: {
		initial: { x: 0 },
		hover: { x: 8 },
		focus: {
			x: [0, 8, 0],
			transition: { repeat: Number.POSITIVE_INFINITY },
		},
		active: { x: 24 },
	},
	down: {
		initial: { y: 0 },
		hover: { y: 8 },
		focus: {
			y: [0, 8, 0],
			transition: { repeat: Number.POSITIVE_INFINITY },
		},
		active: { y: 24 },
	},
	left: {
		initial: { x: 0 },
		hover: { x: -8 },
		focus: {
			x: [0, -8, 0],
			transition: { repeat: Number.POSITIVE_INFINITY },
		},
		active: { x: -24 },
	},
}

interface ArrowLinkProps {
	className?: string
	direction?: ArrowIconProps['direction']
	href?: string
	children: React.ReactNode
	as?: string
}

const MotionLink = motion(Link)
const MotionSpan = motion.span

function ArrowLink({
	children,
	direction = 'right',
	className,
	href,
	...props
}: ArrowLinkProps) {
	const [ref, state] = useElementState()

	const Tag = href ? MotionLink : MotionSpan

	return (
		<Tag
			{...props}
			href={href ?? '#'}
			className={cx(
				'space-x-md text-primary inline-flex cursor-pointer items-center text-left text-lg font-bold !no-underline transition focus:outline-none',
				className,
			)}
			ref={ref as any}
			animate={state}
		>
			{children && (direction === 'right' || direction === 'up') ? (
				<span className="mr-lg font-bold">{children}</span>
			) : null}

			<div className="p-sm relative inline-flex size-14 flex-none items-center justify-center">
				<motion.span variants={arrowVariants[direction]}>
					<ArrowIcon size={20} direction={direction} />
				</motion.span>
			</div>

			{children && (direction === 'left' || direction === 'down') ? (
				<span className="ml-lg text-xl font-bold">{children}</span>
			) : null}
		</Tag>
	)
}

function BackLink({
	href,
	className,
	children,
}: { href: string } & Pick<ArrowLinkProps, 'className' | 'children'>) {
	const [ref, state] = useElementState()

	const Tag = href ? MotionLink : MotionSpan

	return (
		<Tag
			href={href}
			className={cx(
				'text-primary flex space-x-4 focus:outline-none',
				className,
			)}
			ref={ref as any}
			animate={state}
		>
			<motion.span variants={arrowVariants.left}>
				<ArrowIcon size={20} direction="left" />
			</motion.span>
			<span>{children}</span>
		</Tag>
	)
}

export { ArrowLink, BackLink }
