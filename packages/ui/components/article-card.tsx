'use client'

import { Badge, H2, type H3, Skeleton } from '@nerdfish/ui'
import { cx } from '@nerdfish/utils'
import Image from 'next/image'
import Link from 'next/link'
import * as React from 'react'
import { getCategoryColors } from './category-indicator'
import { Cursor } from './cursor'
import { DateFormatter } from './date-formatter'

function ReadMoreCursor({ children }: { children: React.ReactNode }) {
	return (
		<Cursor attachToParent>
			<div className="motion-preset-pop group motion-duration-300 relative inline-flex items-center gap-md transition-all group-active:scale-125">
				<svg
					fill="none"
					height="18"
					viewBox="0 0 17 18"
					width="17"
					className="-rotate-90 origin-center"
				>
					<path
						d="M15.5036 3.11002L12.5357 15.4055C12.2666 16.5204 10.7637 16.7146 10.22 15.7049L7.4763 10.6094L2.00376 8.65488C0.915938 8.26638 0.891983 6.73663 1.96711 6.31426L13.8314 1.65328C14.7729 1.28341 15.741 2.12672 15.5036 3.11002ZM7.56678 10.6417L7.56645 10.6416C7.56656 10.6416 7.56667 10.6416 7.56678 10.6417L7.65087 10.4062L7.56678 10.6417Z"
						fill="currentColor"
						stroke="currentColor"
						strokeWidth="1.5"
					/>
				</svg>
				<div
					className={cx(
						'relative w-fit rounded-container bg-current px-sm py-xs font-bold text-current'
					)}
				>
					<span className="text-inverted">{children}</span>
				</div>
			</div>
		</Cursor>
	)
}

export function ArticleCardImage({
	src,
	alt,
	category,
	readMoreLabel = 'Read More',
}: {
	src?: string | null
	category?: string | null
	alt?: string | null
	readMoreLabel?: string
}) {
	return (
		<div
			className={cx(
				'relative aspect-h-4 aspect-w-3 overflow-hidden rounded-container shadow-outline ring-2 ring-transparent ring-offset-2 ring-offset-inverted group-hover:ring-2 group-hover:ring-current group-focus:ring-current',
				category && getCategoryColors(category)
			)}
		>
			<Skeleton className="absolute inset-0 size-full rounded-container object-cover" />

			{src ? (
				<Image
					className="motion-blur-in-3xl motion-duration-500 absolute inset-0 size-full rounded-container object-cover"
					src={src}
					fill
					alt={alt ?? ''}
				/>
			) : null}

			<ReadMoreCursor>{readMoreLabel}</ReadMoreCursor>
		</div>
	)
}

ArticleCardImage.displayName = 'ArticleCardImage'

export const ArticleCardContent = React.forwardRef<
	HTMLDivElement,
	React.ComponentPropsWithoutRef<'div'>
>(({ className, ...props }, ref) => {
	return <div ref={ref} {...props} className={cx('mt-md', className)} />
})

ArticleCardContent.displayName = 'ArticleCardContent'

export const ArticleCardTitle = React.forwardRef<
	HTMLHeadingElement,
	React.ComponentPropsWithoutRef<typeof H3>
>(({ className, ...props }, ref) => {
	return (
		<H2
			as="h3"
			variant="primary"
			ref={ref}
			{...props}
			className={cx('!mt-0 mb-sm line-clamp-2', className)}
		/>
	)
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
			className={cx('mb-sm font-bold text-muted text-xl', className)}
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
			className={cx('mt-0 line-clamp-2 text-muted', className)}
		>
			{children}
		</div>
	)
})

ArticleCardDescription.displayName = 'ArticleCardDescription'

export const ArticleCardCategory = React.forwardRef<
	HTMLDivElement,
	React.ComponentPropsWithoutRef<'div'>
>(({ children, className, ...props }, ref) => {
	if (!children) return null

	const value = typeof children === 'string' ? children : undefined

	return (
		<Badge
			ref={ref}
			variant="default"
			{...props}
			className={cx(
				'relative mb-sm bg-muted px-md py-sm text-sm',
				getCategoryColors(value),
				className
			)}
		>
			<span className="sr-only">Category: </span>
			{children}
		</Badge>
	)
})

ArticleCardCategory.displayName = 'ArticleCardCategory'

export const ArticleCard = React.forwardRef<
	HTMLDivElement,
	React.ComponentPropsWithoutRef<'div'> & {
		href?: string
		title?: string
	}
>(({ href, title, children, className, ...props }, ref) => {
	return (
		<div
			ref={ref}
			className={cx('group relative w-full outline-none', className)}
			{...props}
		>
			{href ? (
				<Link href={href} className="group outline-none" aria-label={title}>
					<div aria-hidden className="peer relative block w-full outline-none">
						{children}
					</div>
				</Link>
			) : (
				<div aria-hidden className="peer relative block w-full outline-none">
					{children}
				</div>
			)}
			<div className="sr-only">{children}</div>
		</div>
	)
})

ArticleCard.displayName = 'ArticleCard'
