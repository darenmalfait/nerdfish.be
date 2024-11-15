'use client'

import { Badge, H2 } from '@nerdfish/ui'
import { cx } from '@nerdfish/utils'
import { getCategoryColors } from '@nerdfish-website/ui/components'
import Image from 'next/image'
import Link from 'next/link'
import * as React from 'react'
import { ArrowLink } from './arrow-link'

export const HighlightCardImage = React.forwardRef<
	HTMLDivElement,
	React.ComponentPropsWithoutRef<'div'> & {
		src?: string | null
		alt?: string
	}
>(({ src, alt, className, ...props }, ref) => {
	if (!src) return null
	return (
		<div
			ref={ref}
			{...props}
			className={cx(
				'aspect-h-4 aspect-w-3 rounded-semi mt-lg pointer-events-none relative col-span-full h-0 overflow-hidden lg:col-span-4 lg:col-start-8 lg:mt-0',
				className,
			)}
		>
			{src ? (
				<Image
					className="motion-blur-in-3xl motion-duration-500 absolute inset-0 object-cover"
					src={src}
					fill
					alt={alt ?? ''}
				/>
			) : null}
		</div>
	)
})

HighlightCardImage.displayName = 'HighlightCardImage'

export const HighlightCardContent = React.forwardRef<
	HTMLDivElement,
	React.ComponentPropsWithoutRef<'div'>
>(({ className, ...props }, ref) => {
	if (!props.children) return null

	return (
		<div
			ref={ref}
			{...props}
			className={cx(
				'col-span-4 flex flex-col md:col-span-6 lg:col-span-5 lg:col-start-2 lg:justify-start',
				className,
			)}
		/>
	)
})

HighlightCardContent.displayName = 'HighlightCardContent'

export const HighlightCardTitle = React.forwardRef<
	React.ElementRef<typeof H2>,
	React.ComponentPropsWithoutRef<typeof H2>
>(({ className, ...props }, ref) => {
	if (!props.children) return null
	return (
		<H2
			ref={ref}
			variant="primary"
			as="h3"
			{...props}
			className={cx('mt-0', className)}
		/>
	)
})

HighlightCardTitle.displayName = 'HighlightCardTitle'

export const HighlightCardSubtitle = React.forwardRef<
	HTMLDivElement,
	React.ComponentPropsWithoutRef<'div'>
>(({ className, ...props }, ref) => {
	if (!props.children) return null

	return (
		<div
			ref={ref}
			{...props}
			className={cx('text-primary mt-md text-xl font-bold', className)}
		/>
	)
})

HighlightCardSubtitle.displayName = 'HighlightCardSubtitle'

export const HighlightCardCategory = React.forwardRef<
	HTMLDivElement,
	React.ComponentPropsWithoutRef<'div'> & {
		value?: string | null
	}
>(({ value, className, ...props }, ref) => {
	if (!value) return null

	return (
		<div>
			<Badge
				ref={ref}
				variant="default"
				{...props}
				className={cx(
					'bg-primary mb-md px-md py-sm w-auto text-base',
					getCategoryColors(value),
					className,
				)}
			>
				<span className="sr-only">Category: </span>
				{value}
			</Badge>
		</div>
	)
})

HighlightCardCategory.displayName = 'HighlightCardCategory'

export const HighlightCardDescription = React.forwardRef<
	HTMLParagraphElement,
	React.ComponentPropsWithoutRef<'p'>
>(({ children, className, ...props }, ref) => {
	if (!children) return null

	return (
		<div
			ref={ref}
			{...props}
			className={cx('text-muted mt-md line-clamp-3', className)}
		>
			{children}
		</div>
	)
})

HighlightCardDescription.displayName = 'HighlightCardDescription'

export const HighlightCardCTA = React.forwardRef<
	HTMLDivElement,
	React.ComponentPropsWithoutRef<'div'> & {
		href: string
		children: React.ReactNode
		category?: string | null
	}
>(({ href, category, children, className, ...props }, ref) => {
	if (!children || !href) return null

	return (
		<div
			ref={ref}
			{...props}
			className={cx('mt-lg flex flex-1 items-end justify-start', className)}
		>
			<ArrowLink as="span">
				{children}
				<div
					className={cx(
						'focus-ring rounded-semi absolute inset-0',
						getCategoryColors(category ?? 'unknown'),
					)}
				/>
				<div className="rounded-semi -z-1 absolute inset-0" />
			</ArrowLink>
		</div>
	)
})

HighlightCardCTA.displayName = 'HighlightCardCTA'

export const HighlightCard = React.forwardRef<
	HTMLDivElement,
	React.ComponentPropsWithoutRef<'div'> & {
		href: string
		title: string
	}
>(({ href, children, title, className, ...props }, ref) => {
	return (
		<div
			ref={ref}
			className={cx(
				'bg-muted rounded-semi relative w-full outline-none',
				className,
			)}
			{...props}
		>
			<Link
				href={href}
				aria-label={title}
				className={cx(
					'rounded-semi group block no-underline outline-none lg:bg-transparent',
					className,
				)}
			>
				<div className="shadow-outline p-lg rounded-semi group relative grid w-full grid-cols-4 md:grid-cols-8 lg:grid-cols-12 lg:px-0">
					{children}
				</div>
			</Link>
			<div className="sr-only">{children}</div>
		</div>
	)
})

HighlightCard.displayName = 'HighlightCard'
