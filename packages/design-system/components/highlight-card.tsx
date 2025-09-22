'use client'

import { cx } from '@repo/lib/utils/base'
import Image from 'next/image'
import Link from 'next/link'
import { type ElementType, type ReactNode, type ComponentProps } from 'react'
import { ArrowRightIcon } from '../icons'
import { Badge, Button, H1, type H2 } from './ui'

export interface HighlightCardImageProps extends ComponentProps<'div'> {
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
				'mt-lg aspect-h-4 aspect-w-3 pointer-events-none relative col-span-full h-0 overflow-hidden rounded-[calc(theme(borderRadius.container)-theme(padding.md))] lg:col-span-4 lg:col-start-9 lg:mt-0',
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

export type HighlightCardContentProps = ComponentProps<'div'>

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
				'p-md col-span-4 flex h-full flex-col md:col-span-6 lg:col-span-7 lg:justify-start',
				className,
			)}
		>
			{children}
		</div>
	)
}

export type HighlightCardTitleProps = ComponentProps<typeof H2>

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
			<span className="leading-[1.1]">{children}</span>
		</H1>
	)
}

export type HighlightCardSubtitleProps = ComponentProps<'div'>

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
				'mt-md text-foreground line-clamp-2 text-xl font-bold',
				className,
			)}
		/>
	)
}

export type HighlightCardCategoryProps = ComponentProps<'div'> & {
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
					'mb-md bg-foreground/10 px-md py-sm bg-background text-foreground w-auto text-base',
					className,
				)}
			>
				<span className="sr-only">Category: </span>
				{value}
			</Badge>
		</div>
	)
}

export type HighlightCardDescriptionProps = ComponentProps<'p'>

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
				'mt-md text-foreground/80 line-clamp-2 text-xl font-semibold',
				className,
			)}
		>
			{children}
		</p>
	)
}

export interface HighlightCardCTAProps
	extends Omit<ComponentProps<typeof Link>, 'as'> {
	href: string
	children: ReactNode
	category?: string | null
	as?: ElementType
}

export function HighlightCardCTA({
	href,
	children,
	category,
	className,
	as,
	...props
}: HighlightCardCTAProps) {
	if (!children || !href) return null

	const LinkElement = as ?? Link

	return (
		<div className={cx('mt-lg flex flex-1 items-end justify-start', className)}>
			<Button size="lg" asChild className="group">
				<LinkElement href={href} {...props}>
					{children}{' '}
					<span>
						<ArrowRightIcon
							className={cx(
								'ml-sm group-hover:translate-x-xs size-4 transition-transform',
							)}
						/>
					</span>
				</LinkElement>
			</Button>
		</div>
	)
}

export interface HighlightCardProps extends ComponentProps<'div'> {
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
				'focus-outline rounded-container bg-background-muted relative w-full max-w-full overflow-hidden outline-none',
				className,
			)}
			{...props}
		>
			<div className="'rounded-container lg:bg-transparent' block no-underline outline-none">
				<div className="rounded-container p-md relative grid w-full grid-cols-4 items-center md:grid-cols-8 lg:grid-cols-12">
					{children}
				</div>
			</div>
		</div>
	)
}
