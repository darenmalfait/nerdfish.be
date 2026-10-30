import { type ComponentProps } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@nerdfish/react/avatar'
import { Skeleton } from '@nerdfish/react/skeleton'
import { type Product } from 'content-collections'

import { cn } from '@repo/lib/utils/class'

import { Link } from '~/components/link'

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
}: ComponentProps<'div'>) {
	return <div className={cn('min-w-0', className)} {...props} />
}

export function ProductCardTitle({ className, ...props }: ComponentProps<'p'>) {
	return (
		<p
			className={cn(
				'text-foreground text-md group-hover:text-accent font-semibold',
				'flex items-center text-base font-semibold transition-colors duration-300',
				className,
			)}
			{...props}
		/>
	)
}

export function ProductCardDescription({
	className,
	...props
}: ComponentProps<'p'>) {
	return (
		<p
			className={cn(
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
}: ComponentProps<typeof Link>) {
	return (
		<li>
			<Link
				className={cn(
					'gap-x-friends p-friends rounded-base mx-auto flex w-full max-w-4xl',
					'hover:bg-background-muted focus-within:outline-accent group transition-colors',
					className,
				)}
				{...props}
			/>
		</li>
	)
}
