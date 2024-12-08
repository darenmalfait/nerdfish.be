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
				'mt-lg aspect-h-4 aspect-w-3 rounded-container pointer-events-none relative col-span-full h-0 overflow-hidden lg:col-span-4 lg:col-start-8 lg:mt-0',
				className,
			)}
		>
			{src ? (
				<Image
					className="motion-blur-in-3xl motion-duration-500 absolute inset-0 object-cover"
					src={src}
					width={550}
					height={550}
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
			className={cx('mt-0 md:!text-5xl xl:!text-7xl', className)}
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
			className={cx(
				'mt-md text-primary line-clamp-2 text-xl font-bold',
				className,
			)}
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
					'mb-md bg-inverted/10 px-md py-sm text-primary w-auto text-base',
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
				'mt-md text-muted line-clamp-2 text-xl font-semibold',
				className,
			)}
		>
			{children}
		</p>
	)
})

HighlightCardDescription.displayName = 'HighlightCardDescription'

export const HighlightCardCTA = React.forwardRef<
	React.ElementRef<typeof Link>,
	React.ComponentPropsWithoutRef<typeof Link> & {
		href: string
		children: React.ReactNode
		category?: string | null
	}
>(({ href, category, children, className, ...props }, ref) => {
	if (!children || !href) return null

	return (
		<div className={cx('mt-lg flex flex-1 items-end justify-start', className)}>
			<MagnetButton
				size="lg"
				variant="ghost"
				asChild
				className="bg-primary/70 hover:bg-primary group"
			>
				<Link ref={ref} href={href} {...props}>
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
				'focus-outline rounded-container bg-muted relative w-full max-w-full overflow-hidden outline-none',
				className,
			)}
			{...props}
		>
			<div className="'rounded-container lg:bg-transparent' block no-underline outline-none">
				<div className="rounded-container p-lg relative grid w-full grid-cols-4 items-center md:grid-cols-8 lg:grid-cols-12 lg:px-0">
					{children}
				</div>
			</div>
		</div>
	)
})

HighlightCard.displayName = 'HighlightCard'
