'use client'

import { Marquee } from '@nerdfish/react/marquee'
import { cn } from '@repo/lib/utils/class'
import { type ComponentProps } from 'react'

export interface KeywordProps extends Omit<ComponentProps<'span'>, 'children'> {
	children: string
}

export function Keyword({ children, className, ...props }: KeywordProps) {
	return (
		<span
			aria-label={children}
			className={cn('typography-heading-lg uppercase', className)}
			{...props}
		>
			<span>{children}</span>
			<span aria-hidden className="ml-md">
				-
			</span>
		</span>
	)
}

export type KeywordListProps = ComponentProps<typeof Marquee>

export function KeywordList({ children, ...props }: KeywordListProps) {
	return (
		<div className="max-w-full overflow-hidden">
			<Marquee pauseOnHover repeat={5} {...props}>
				{children}
			</Marquee>
		</div>
	)
}
