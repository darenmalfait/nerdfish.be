'use client'

import { Badge, H1, type H2 } from '@nerdfish/ui'
import { cx } from '@nerdfish/utils'
import {
	getCategoryColors,
	MagnetButton,
} from '@nerdfish-website/ui/components'
import { ArrowRightIcon } from '@nerdfish-website/ui/icons'
import Image from 'next/image'
import Link from 'next/link'
import * as React from 'react'

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
				'aspect-h-4 aspect-w-3 rounded-container mt-lg pointer-events-none relative col-span-full h-0 overflow-hidden lg:col-span-4 lg:col-start-8 lg:mt-0',
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
				'py-lg col-span-4 flex flex-col md:col-span-6 lg:col-span-5 lg:col-start-2 lg:justify-start',
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
		<H1
			ref={ref}
			variant="primary"
			as="h2"
			{...props}
			className={cx('mt-0 lg:!text-7xl', className)}
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
					'bg-inverted/10 text-primary mb-md px-md py-sm w-auto text-base',
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
		<p
			ref={ref}
			{...props}
			className={cx(
				'text-muted mt-md line-clamp-3 text-xl font-semibold',
				className,
			)}
		>
			{children}
		</p>
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
			<MagnetButton
				size="lg"
				variant="ghost"
				asChild
				className="bg-primary/70 hover:bg-primary group"
			>
				<Link href={href}>
					{children}{' '}
					<span className={getCategoryColors(category ?? 'unknown')}>
						<ArrowRightIcon
							className={cx(
								'ml-sm group-hover:translate-x-xs group-hover:text-primary size-4 transition-transform',
							)}
						/>
					</span>
				</Link>
			</MagnetButton>
		</div>
	)
})

HighlightCardCTA.displayName = 'HighlightCardCTA'

export const HighlightCard = React.forwardRef<
	HTMLDivElement,
	React.ComponentPropsWithoutRef<'div'> & {
		title: string
	}
>(({ children, title, className, ...props }, ref) => {
	return (
		<div
			ref={ref}
			className={cx(
				'bg-muted rounded-container focus-outline relative w-full max-w-full overflow-hidden outline-none',
				className,
			)}
			{...props}
		>
			<div
				className={cx(
					'rounded-container block no-underline outline-none lg:bg-transparent',
					className,
				)}
			>
				<div className="p-lg rounded-container relative grid w-full grid-cols-4 md:grid-cols-8 lg:grid-cols-12 lg:px-0">
					{children}
				</div>
			</div>
		</div>
	)
})

HighlightCard.displayName = 'HighlightCard'
