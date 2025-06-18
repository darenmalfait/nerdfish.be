import {
	Avatar,
	AvatarFallback,
	AvatarImage,
	Skeleton,
} from '@repo/design-system/components/ui'
import { cx } from '@repo/lib/utils/base'
import { type Product } from 'content-collections'
import * as React from 'react'
import { Link } from '~/app/components/link'

export function ProductCardImage({ icon }: Partial<Pick<Product, 'icon'>>) {
	if (!icon?.src) return null

	return (
		<Avatar className="text-foreground rounded-subtle size-12 overflow-hidden">
			<AvatarImage src={icon.src} className="object-cover" alt={icon.alt} />
			<AvatarFallback>
				<Skeleton className="size-full" />
			</AvatarFallback>
		</Avatar>
	)
}

export function ProductCardContent({
	className,
	...props
}: React.ComponentProps<'div'>) {
	return <div className={cx('min-w-0', className)} {...props} />
}

export function ProductCardTitle({
	className,
	...props
}: React.ComponentProps<'p'>) {
	return (
		<p
			className={cx(
				'text-foreground text-md group-hover:text-brand font-semibold',
				'flex items-center text-base font-semibold transition-all duration-300',
				className,
			)}
			{...props}
		/>
	)
}

export function ProductCardDescription({
	className,
	...props
}: React.ComponentProps<'p'>) {
	return (
		<p
			className={cx(
				'text-foreground-muted line-clamp-1 truncate text-base font-normal',
				className,
			)}
			{...props}
		/>
	)
}

export function ProductCard({
	className,
	...props
}: React.ComponentProps<typeof Link>) {
	return (
		<li>
			<Link
				className={cx(
					'gap-x-md p-md rounded-base mx-auto flex w-full max-w-4xl',
					'hover:bg-background-muted focus-within:outline-accent group transition-all',
					className,
				)}
				{...props}
			/>
		</li>
	)
}
