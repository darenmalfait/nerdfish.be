'use client'

import {
	type ElementState,
	useElementState,
} from '@repo/lib/hooks/use-element-state'
import { cx } from '@repo/lib/utils/base'
import { type Variant, motion } from 'motion/react'
import Link from 'next/link'
import type * as React from 'react'
import {
	ArrowIcon,
	type ArrowIconVariants,
	type ArrowIconProps,
} from '../icons'

const arrowVariants: Record<
	NonNullable<ArrowIconVariants['direction']>,
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

export interface ArrowLinkProps {
	className?: string
	direction?: ArrowIconProps['direction']
	href?: string
	children: React.ReactNode
	as?: React.ElementType
}

function ArrowLink({
	children,
	direction = 'right',
	className,
	href,
	as,
	...props
}: ArrowLinkProps) {
	const Tag = as ? motion(as) : href ? motion(Link) : motion.span
	const [ref, state] = useElementState()

	return (
		<Tag
			{...props}
			href={href ?? '#'}
			className={cx(
				'space-x-friends text-foreground inline-flex cursor-pointer items-center text-left text-lg font-bold no-underline! transition focus:outline-none',
				className,
			)}
			ref={ref as any}
			animate={state}
		>
			{children && (direction === 'right' || direction === 'up') ? (
				<span className="mr-lg font-bold">{children}</span>
			) : null}

			<div className="p-best-friends relative inline-flex size-14 flex-none items-center justify-center">
				<motion.span variants={arrowVariants[direction ?? 'right']}>
					<ArrowIcon size={20} direction={direction} />
				</motion.span>
			</div>

			{children && (direction === 'left' || direction === 'down') ? (
				<span className="ml-casual text-xl font-bold">{children}</span>
			) : null}
		</Tag>
	)
}

function BackLink({
	href,
	className,
	children,
	as,
}: { href: string } & Pick<ArrowLinkProps, 'className' | 'children' | 'as'>) {
	const [ref, state] = useElementState()

	const Tag = as ? motion(as) : href ? motion(Link) : motion.span

	return (
		<Tag
			href={href}
			className={cx(
				'text-foreground space-x-friends flex focus:outline-none',
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
