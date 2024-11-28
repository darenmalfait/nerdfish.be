'use client'

import { Badge, H1, type H2 } from '@nerdfish/ui'
import { cx } from '@nerdfish/utils'
import Image from 'next/image'
import Link from 'next/link'
import * as React from 'react'
import { ArrowRightIcon } from '../icons'
import { getCategoryColors } from './category-indicator'
import { MagnetButton } from './magnet-button'

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
				'pointer-events-none relative col-span-full mt-lg aspect-h-4 aspect-w-3 h-0 overflow-hidden rounded-container lg:col-span-4 lg:col-start-8 lg:mt-0',
				className
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
				'col-span-4 flex flex-col py-lg md:col-span-6 lg:col-span-5 lg:col-start-2 lg:justify-start',
				className
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
			className={cx('lg:!text-7xl mt-0', className)}
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
			className={cx('mt-md font-bold text-primary text-xl', className)}
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
					'mb-md w-auto bg-inverted/10 px-md py-sm text-base text-primary',
					getCategoryColors(value),
					className
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
				'mt-md line-clamp-3 font-semibold text-muted text-xl',
				className
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
				className="group bg-primary/70 hover:bg-primary"
			>
				<Link href={href}>
					{children}{' '}
					<span className={getCategoryColors(category ?? 'unknown')}>
						<ArrowRightIcon
							className={cx(
								'ml-sm size-4 transition-transform group-hover:translate-x-xs group-hover:text-primary'
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
				'focus-outline relative w-full max-w-full overflow-hidden rounded-container bg-muted outline-none',
				className
			)}
			{...props}
		>
			<div
				className={cx(
					'block rounded-container no-underline outline-none lg:bg-transparent',
					className
				)}
			>
				<div className="relative grid w-full grid-cols-4 rounded-container p-lg md:grid-cols-8 lg:grid-cols-12 lg:px-0">
					{children}
				</div>
			</div>
		</div>
	)
})

HighlightCard.displayName = 'HighlightCard'
