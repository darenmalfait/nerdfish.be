'use client'

import { Badge, H3, Skeleton } from '@nerdfish/ui'
import { cx } from '@nerdfish/utils'
import {
	getCategoryColors,
	DateFormatter,
} from '@nerdfish-website/ui/components'
import Image from 'next/image'
import Link from 'next/link'
import * as React from 'react'

export function ArticleCardImage({
	src,
	alt,
	category,
}: {
	src?: string | null
	category?: string | null
	alt?: string | null
}) {
	return (
		<div
			className={cx(
				'aspect-h-4 aspect-w-3 shadow-outline ring-offset-inverted rounded-semi relative ring-2 ring-transparent ring-offset-2 group-hover:ring-2 group-hover:ring-current group-focus:ring-current',
				category && getCategoryColors(category),
			)}
		>
			<Skeleton className="rounded-semi absolute inset-0 size-full object-cover" />

			{src ? (
				<Image
					className="rounded-semi absolute inset-0 size-full object-cover"
					src={src}
					fill
					alt={alt ?? ''}
				/>
			) : null}
		</div>
	)
}

ArticleCardImage.displayName = 'ArticleCardImage'

export const ArticleCardContent = React.forwardRef<
	HTMLDivElement,
	React.ComponentPropsWithoutRef<'div'>
>(({ className, ...props }, ref) => {
	return (
		<div ref={ref} {...props} className={cx('mt-8 space-y-2', className)} />
	)
})

ArticleCardContent.displayName = 'ArticleCardContent'

export const ArticleCardTitle = React.forwardRef<
	HTMLHeadingElement,
	React.ComponentPropsWithoutRef<typeof H3>
>((props, ref) => {
	return <H3 ref={ref} {...props} />
})

ArticleCardTitle.displayName = 'ArticleCardTitle'

export const ArticleCardDate = React.forwardRef<
	HTMLDivElement,
	React.ComponentPropsWithoutRef<'div'> & {
		value?: string
	}
>(({ value, className, ...props }, ref) => {
	if (!value) return null

	return (
		<div
			ref={ref}
			{...props}
			className={cx('text-muted text-xl font-bold', className)}
		>
			<DateFormatter dateString={value} format="PPP" />
		</div>
	)
})

ArticleCardDate.displayName = 'ArticleCardDate'

export const ArticleCardDescription = React.forwardRef<
	HTMLParagraphElement,
	React.ComponentPropsWithoutRef<'p'>
>(({ children, className, ...props }, ref) => {
	if (!children) return null

	return (
		<div
			ref={ref}
			{...props}
			className={cx('text-muted line-clamp-2', className)}
		>
			{children}
		</div>
	)
})

ArticleCardDescription.displayName = 'ArticleCardDescription'

export const ArticleCardCategory = React.forwardRef<
	HTMLDivElement,
	React.ComponentPropsWithoutRef<'div'> & {
		value?: string | null
	}
>(({ value, className, ...props }, ref) => {
	if (!value) return null

	return (
		<Badge
			ref={ref}
			variant="default"
			{...props}
			className={cx('bg-muted', getCategoryColors(value), className)}
		>
			<span className="sr-only">Category: </span>
			{value}
		</Badge>
	)
})

ArticleCardCategory.displayName = 'ArticleCardCategory'

export const ArticleCard = React.forwardRef<
	HTMLDivElement,
	React.ComponentPropsWithoutRef<'div'> & {
		href: string
		title: string
	}
>(({ href, title, children, className, ...props }, ref) => {
	return (
		<div
			ref={ref}
			className={cx('group relative w-full outline-none', className)}
			{...props}
		>
			<Link href={href} className="group outline-none" aria-label={title}>
				<div aria-hidden className="peer relative block w-full outline-none">
					{children}
				</div>
			</Link>
			<div className="sr-only">{children}</div>
		</div>
	)
})

ArticleCard.displayName = 'ArticleCard'
