'use client'

import {
	type ElementState,
	useElementState,
} from '@repo/lib/hooks/use-element-state'
import { cn } from '@repo/lib/utils/class'
import { type Variant, motion } from 'motion/react'
import Link from 'next/link'
import {
	type ElementType,
	type HTMLAttributes,
	type ReactNode,
	type Ref,
} from 'react'
import { ArrowIcon, type ArrowIconVariants } from '../icons'
import { type ArrowLinkProps } from './arrow-link'

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

function PolymorphicRoot({
	as: Component = 'span',
	ref,
	...props
}: {
	as?: ElementType
	ref?: Ref<HTMLElement | null>
	children?: ReactNode
	href?: string
} & HTMLAttributes<HTMLElement>) {
	return <Component ref={ref} {...props} />
}

const MotionRoot = motion.create(PolymorphicRoot)

export function ArrowLink({
	children,
	direction = 'right',
	className,
	href,
	as,
	...props
}: ArrowLinkProps) {
	const [ref, state] = useElementState()

	return (
		<MotionRoot
			{...props}
			as={as ?? (href ? Link : 'span')}
			href={href ?? '#'}
			className={cn(
				'space-x-friends text-foreground inline-flex cursor-pointer items-center text-left text-lg font-bold no-underline! transition focus:outline-none',
				className,
			)}
			ref={ref as never}
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
		</MotionRoot>
	)
}

export function BackLink({
	href,
	className,
	children,
	as,
}: { href: string } & Pick<ArrowLinkProps, 'className' | 'children' | 'as'>) {
	const [ref, state] = useElementState()

	return (
		<MotionRoot
			as={as ?? (href ? Link : 'span')}
			href={href}
			className={cn(
				'text-foreground space-x-friends flex focus:outline-none',
				className,
			)}
			ref={ref as never}
			animate={state}
		>
			<motion.span variants={arrowVariants.left}>
				<ArrowIcon size={20} direction="left" />
			</motion.span>
			<span>{children}</span>
		</MotionRoot>
	)
}
