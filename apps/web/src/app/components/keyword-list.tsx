import { cx } from '@nerdfish/utils'
import { H1, Marquee } from '@repo/design-system/components/ui'
import type * as React from 'react'

export interface KeywordProps
	extends Omit<React.ComponentProps<typeof H1>, 'children'> {
	children: string
}

export function Keyword({ children, className, ...props }: KeywordProps) {
	return (
		<H1
			as="span"
			variant="primary"
			aria-label={children}
			className={cx('uppercase', className)}
			{...props}
		>
			<span>{children}</span>
			<span aria-hidden className="ml-md">
				-
			</span>
		</H1>
	)
}

export type KeywordListProps = React.ComponentProps<typeof Marquee>

export function KeywordList({ children, ...props }: KeywordListProps) {
	return (
		<div className="max-w-full overflow-hidden">
			<Marquee pauseOnHover duration={20000} repeat={5} {...props}>
				{children}
			</Marquee>
		</div>
	)
}
