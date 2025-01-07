import { cx } from '@nerdfish/utils'
import { Skeleton } from '@repo/design-system/components/ui'
import Image from 'next/image'
import type * as React from 'react'

export type SplitImageProps = React.ComponentProps<typeof Image>

export function SplitImage({ className, ...props }: SplitImageProps) {
	return (
		<div
			className={cx(
				'aspect-1 rounded-container relative w-full overflow-hidden',
				className,
			)}
		>
			<Skeleton className="rounded-container absolute inset-0 size-full object-cover" />

			<Image
				className="motion-blur-in-3xl motion-duration-500 rounded-container absolute inset-0 size-full object-cover"
				width={550}
				height={550}
				{...props}
			/>
		</div>
	)
}

export type SplitContentProps = React.ComponentProps<'div'>

export function SplitContent({
	children,
	className,
	...props
}: SplitContentProps) {
	return (
		<div
			className={cx(
				'prose prose-xl lg:prose-2xl dark:prose-invert w-full',
				className,
			)}
			{...props}
		>
			{children}
		</div>
	)
}

export type SplitProps = React.ComponentProps<'div'>

export function Split({ children, className, ...props }: SplitProps) {
	return (
		<div
			className={cx(
				'gap-lg flex flex-col md:flex-row md:items-center',
				className,
			)}
			{...props}
		>
			{children}
		</div>
	)
}
