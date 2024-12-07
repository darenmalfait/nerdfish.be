'use client'

import { Badge, H2, type H3, Skeleton } from '@nerdfish/ui'
import { cx } from '@nerdfish/utils'
import { motion } from 'motion/react'
import Image from 'next/image'
import Link from 'next/link'
import * as React from 'react'
import { ArrowRightIcon } from '../icons'
import { getCategoryColors } from './category-indicator'
import { Cursor } from './cursor'
import { DateFormatter } from './date-formatter'

function ReadMoreCursor({ children }: { children: React.ReactNode }) {
	return (
		<Cursor
			className="fixed z-50 -ml-4 -mt-4"
			variants={{
				initial: {
					scale: 0,
				},
				animate: {
					scale: 1,
				},
				exit: {
					scale: 0,
				},
			}}
			attachToParent
		>
			<motion.div
				className="bg-primary flex size-16 items-center justify-center rounded-full text-current transition-transform group-active:scale-125"
				transition={{ type: 'spring', stiffness: 300, damping: 30 }}
			>
				<ArrowRightIcon className="size-8" />
				{children}
			</motion.div>
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
	alt: string | null
	readMoreLabel?: string
}) {
	return (
		<div
			className={cx(
				'aspect-h-4 aspect-w-3 rounded-container shadow-outline ring-offset-inverted relative overflow-hidden ring-2 ring-transparent ring-offset-2 group-hover:ring-2 group-hover:ring-current group-focus:ring-current',
				category && getCategoryColors(category),
			)}
		>
			<Skeleton className="rounded-container absolute inset-0 size-full object-cover" />

			{src ? (
				<Image
					className="motion-blur-in-3xl motion-duration-500 rounded-container absolute inset-0 size-full object-cover"
					src={src}
					fill
					alt={alt ?? ''}
				/>
			) : null}

			<ReadMoreCursor>
				<span className="sr-only">{readMoreLabel}</span>
			</ReadMoreCursor>
		</div>
	)
}

ArticleCardImage.displayName = 'ArticleCardImage'

export const ArticleCardContent = React.forwardRef<
	HTMLDivElement,
	React.ComponentPropsWithoutRef<'div'>
>(({ className, ...props }, ref) => {
	return <div ref={ref} {...props} className={cx('mt-lg', className)} />
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
			className={cx('mb-sm text-muted text-xl font-bold', className)}
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
				'mb-sm bg-muted px-md py-sm relative text-sm',
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
