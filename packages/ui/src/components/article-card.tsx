'use client'

import { Badge, H2, type H3, Skeleton } from '@nerdfish/ui'
import { cx } from '@nerdfish/utils'
import { getCategoryColors, DateFormatter, Cursor } from '@repo/ui/components'
import Image from 'next/image'
import Link from 'next/link'
import * as React from 'react'

function ReadMoreCursor({ children }: { children: React.ReactNode }) {
	return (
		<Cursor attachToParent>
			<div className="gap-md motion-preset-pop motion-duration-300 group relative inline-flex items-center">
				<svg
					fill="none"
					height="18"
					viewBox="0 0 17 18"
					width="17"
					className="origin-center -rotate-90"
				>
					<path
						d="M15.5036 3.11002L12.5357 15.4055C12.2666 16.5204 10.7637 16.7146 10.22 15.7049L7.4763 10.6094L2.00376 8.65488C0.915938 8.26638 0.891983 6.73663 1.96711 6.31426L13.8314 1.65328C14.7729 1.28341 15.741 2.12672 15.5036 3.11002ZM7.56678 10.6417L7.56645 10.6416C7.56656 10.6416 7.56667 10.6416 7.56678 10.6417L7.65087 10.4062L7.56678 10.6417Z"
						fill="currentColor"
						stroke="currentColor"
						strokeWidth="1.5"
						className="group-active:opacity-50"
					/>
				</svg>
				<div
					className={cx(
						'px-sm py-xs rounded-container relative w-fit bg-current font-bold text-current group-active:opacity-50',
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
				'aspect-h-4 aspect-w-3 shadow-outline ring-offset-inverted rounded-container relative overflow-hidden ring-2 ring-transparent ring-offset-2 group-hover:ring-2 group-hover:ring-current group-focus:ring-current',
				category && getCategoryColors(category),
			)}
		>
			<Skeleton className="rounded-container absolute inset-0 size-full object-cover" />

			{src ? (
				<Image
					className="rounded-container motion-blur-in-3xl motion-duration-500 absolute inset-0 size-full object-cover"
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
			className={cx('mb-sm !mt-0 line-clamp-2', className)}
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
			className={cx('text-muted mb-sm text-xl font-bold', className)}
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
			className={cx('text-muted mt-0 line-clamp-2', className)}
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
				'bg-muted mb-sm px-md py-sm relative text-sm',
				getCategoryColors(value),
				className,
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
