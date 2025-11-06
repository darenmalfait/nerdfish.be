import { Skeleton } from '@nerdfish/react/skeleton'
import { cx } from '@repo/lib/utils/base'
import Image from 'next/image'
import { type ComponentProps } from 'react'

export type SplitImageProps = ComponentProps<typeof Image>

export function SplitImage({ className, ...props }: SplitImageProps) {
	return (
		<div
			className={cx(
				'rounded-container relative aspect-square w-full overflow-hidden',
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

export type SplitContentProps = ComponentProps<'div'>

export function SplitContent({
	children,
	className,
	...props
}: SplitContentProps) {
	return (
		<div className={cx('typography w-full', className)} {...props}>
			{children}
		</div>
	)
}

export type SplitProps = ComponentProps<'div'>

export function Split({ children, className, ...props }: SplitProps) {
	return (
		<div
			className={cx(
				'gap-acquaintances flex flex-col md:flex-row md:items-center',
				className,
			)}
			{...props}
		>
			{children}
		</div>
	)
}
