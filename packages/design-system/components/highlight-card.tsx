'use client'

import { cx } from '@nerdfish/utils'
import Image from 'next/image'
import Link from 'next/link'
import * as React from 'react'
import { ArrowRightIcon } from '../lib/icons'
import { getCategoryColors } from './category-indicator'
import { MagnetButton } from './magnet'
import { TextBalancer } from './text-balancer'
import { Badge, H1, type H2 } from './ui'

export interface HighlightCardImageProps extends React.ComponentProps<'div'> {
	src?: string | null
	alt?: string
	base64Placeholder?: string
}

export function HighlightCardImage({
	src,
	alt,
	className,
	base64Placeholder,
	...props
}: HighlightCardImageProps) {
	if (!src) return null

	return (
		<div
			{...props}
			className={cx(
				'mt-lg aspect-h-4 aspect-w-3 rounded-container pointer-events-none relative col-span-full h-0 overflow-hidden lg:col-span-4 lg:col-start-8 lg:mt-0',
				className,
			)}
		>
			{src ? (
				<Image
					className="absolute inset-0 object-cover"
					src={src}
					width={550}
					height={550}
					alt={alt ?? ''}
					placeholder={base64Placeholder ? 'blur' : undefined}
					blurDataURL={base64Placeholder}
				/>
			) : null}
		</div>
	)
}

export type HighlightCardContentProps = React.ComponentProps<'div'>

export function HighlightCardContent({
	children,
	className,
	...props
}: HighlightCardContentProps) {
	if (!children) return null

	return (
		<div
			{...props}
			className={cx(
				'py-lg col-span-4 flex flex-col md:col-span-6 lg:col-span-5 lg:col-start-2 lg:justify-start',
				className,
			)}
		>
			{children}
		</div>
	)
}

export type HighlightCardTitleProps = React.ComponentProps<typeof H2>

export function HighlightCardTitle({
	className,
	children,
	...props
}: HighlightCardTitleProps) {
	if (!children) return null

	return (
		<H1
			variant="primary"
			as="h2"
			className={cx('mt-0 md:!text-5xl xl:!text-7xl', className)}
			{...props}
		>
			<TextBalancer>{children}</TextBalancer>
		</H1>
	)
}

export type HighlightCardSubtitleProps = React.ComponentProps<'div'>

export function HighlightCardSubtitle({
	children,
	className,
	...props
}: HighlightCardSubtitleProps) {
	if (!children) return null

	return (
		<div
			{...props}
			className={cx(
				'mt-md text-primary line-clamp-2 text-xl font-bold',
				className,
			)}
		/>
	)
}

export type HighlightCardCategoryProps = React.ComponentProps<'div'> & {
	value?: string | null
}

export function HighlightCardCategory({
	value,
	className,
	...props
}: HighlightCardCategoryProps) {
	if (!value) return null

	return (
		<div>
			<Badge
				variant="default"
				{...props}
				className={cx(
					'mb-md bg-inverted/10 px-md py-sm bg-primary text-primary w-auto text-base',
					className,
				)}
			>
				<span className="sr-only">Category: </span>
				{value}
			</Badge>
		</div>
	)
}

export type HighlightCardDescriptionProps = React.ComponentProps<'p'>

export function HighlightCardDescription({
	children,
	className,
	...props
}: HighlightCardDescriptionProps) {
	if (!children) return null

	return (
		<p
			{...props}
			className={cx(
				'mt-md text-primary/80 line-clamp-2 text-xl font-semibold',
				className,
			)}
		>
			{children}
		</p>
	)
}

export interface HighlightCardCTAProps
	extends React.ComponentProps<typeof Link> {
	href: string
	children: React.ReactNode
	category?: string | null
}

export function HighlightCardCTA({
	href,
	children,
	category,
	className,
	...props
}: HighlightCardCTAProps) {
	if (!children || !href) return null

	return (
		<div className={cx('mt-lg flex flex-1 items-end justify-start', className)}>
			<MagnetButton
				size="lg"
				variant="ghost"
				asChild
				className="bg-primary/70 hover:bg-primary group"
			>
				<Link href={href} {...props}>
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
}

export interface HighlightCardProps extends React.ComponentProps<'div'> {
	title: string
}

export function HighlightCard({
	children,
	title,
	className,
	...props
}: HighlightCardProps) {
	return (
		<div
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
}
