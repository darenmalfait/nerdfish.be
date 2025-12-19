'use client'

import { Badge } from '@nerdfish/react/badge'
import { Button } from '@nerdfish/react/button'
import { cn } from '@repo/lib/utils/class'
import Image from 'next/image'
import Link from 'next/link'
import { type ElementType, type ReactNode, type ComponentProps } from 'react'
import { ArrowRightIcon } from '../icons'

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
			className={cn(
				'mt-casual pointer-events-none relative col-span-full aspect-3/4 w-full overflow-hidden rounded-[calc(var(--radius-container)-var(--spacing-friends))] lg:col-span-4 lg:col-start-9 lg:mt-0 lg:h-full lg:w-auto',
				className,
			)}
		>
			{src ? (
				<Image
					className="absolute inset-0 size-full object-cover"
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
			className={cn(
				'p-friends col-span-4 flex h-full flex-col md:col-span-6 lg:col-span-7 lg:justify-start',
				className,
			)}
		>
			{children}
		</div>
	)
}

export type HighlightCardTitleProps = ComponentProps<'h2'>

export function HighlightCardTitle({
	className,
	children,
	...props
}: HighlightCardTitleProps) {
	if (!children) return null

	return (
		<h2 className={cn('typography-heading-sm mt-0', className)} {...props}>
			<span className="leading-[1.1]">{children}</span>
		</h2>
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
			className={cn(
				'typography-title mt-friends text-foreground line-clamp-2',
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
				className={cn(
					'mb-friends bg-foreground/10 px-best-friends py-best-friends text-foreground w-auto text-base',
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
			className={cn(
				'mt-casual text-foreground/80 typography-subtitle line-clamp-3',
				className,
			)}
		>
			{children}
		</p>
	)
}

export interface HighlightCardCTAProps extends Omit<
	ComponentProps<typeof Link>,
	'as'
> {
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
		<div
			className={cn(
				'mt-acquaintances flex flex-1 items-end justify-start',
				className,
			)}
		>
			<Button
				size="lg"
				className="group"
				render={
					<LinkElement href={href} {...props}>
						{children}{' '}
						<span>
							<ArrowRightIcon
								className={cn(
									'ml-best-friends group-hover:translate-x-bff size-4 transition-transform',
								)}
							/>
						</span>
					</LinkElement>
				}
			/>
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
			className={cn(
				'focus-outline rounded-container bg-background-muted relative w-full max-w-full overflow-hidden outline-none',
				className,
			)}
			{...props}
		>
			<div className="rounded-container block no-underline outline-none lg:bg-transparent">
				<div className="rounded-container p-friends relative grid w-full grid-cols-4 items-center md:grid-cols-8 lg:grid-cols-12">
					{children}
				</div>
			</div>
		</div>
	)
}
