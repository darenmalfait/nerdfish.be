'use client'

import { Badge } from '@nerdfish/react/badge'
import { Button } from '@nerdfish/react/button'
import { Skeleton } from '@nerdfish/react/skeleton'
import { cn } from '@repo/lib/utils/class'
import { motion } from 'motion/react'
import { Cursor } from 'motion-cursor'
import Image from 'next/image'
import Link from 'next/link'
import { type ComponentProps, type ReactNode, useState } from 'react'
import { ArrowRightIcon } from '../icons'
import { getCategoryColors } from './category-indicator'

function ReadMoreCursor({
	active,
	readMoreLabel,
}: {
	active: boolean
	readMoreLabel: string
}) {
	if (!active) return null
	return (
		<Cursor className="group fixed z-50 bg-transparent!">
			<Button
				variant="default"
				render={
					<div className="flex items-center justify-center">
						<span className="mr-friends">{readMoreLabel}</span>
						<ArrowRightIcon className="size-6" />
					</div>
				}
				size="xl"
				className="bg-blurred! before:bg-background-inverted/70 text-foregrond-inverted border-border border shadow-md before:absolute before:inset-0 before:-z-1 before:content-['']"
			/>
		</Cursor>
	)
}

export interface ArticleCardImageProps {
	src?: string | null
	alt: string | null
	category?: string | null
	readMoreLabel?: string
	base64Placeholder?: string
}

export function ArticleCardImage({
	src,
	alt,
	category,
	readMoreLabel = 'Read More',
	base64Placeholder,
}: ArticleCardImageProps) {
	const [isHovering, setIsHovering] = useState(false)

	if (!src) return null

	return (
		<motion.div
			onHoverEnd={() => setIsHovering(false)}
			onHoverStart={() => setIsHovering(true)}
			className={cn(
				'rounded-container border-border ring-offset-inverted relative aspect-3/4 w-full overflow-hidden ring-2 ring-transparent ring-offset-2 group-hover:ring-2 group-hover:ring-current group-focus:ring-current',
				category && getCategoryColors(category),
			)}
		>
			<Skeleton className="rounded-container absolute inset-0 size-full object-cover" />

			{src ? (
				<Image
					className="rounded-container absolute inset-0 size-full object-cover"
					src={src}
					width={550}
					height={550}
					alt={alt ?? ''}
					placeholder={base64Placeholder ? 'blur' : undefined}
					blurDataURL={base64Placeholder}
				/>
			) : null}

			<ReadMoreCursor active={isHovering} readMoreLabel={readMoreLabel} />
		</motion.div>
	)
}

export interface ArticleCardContentProps extends ComponentProps<'div'> {
	children: ReactNode
}

export function ArticleCardContent({
	children,
	className,
	...props
}: ArticleCardContentProps) {
	return (
		<div {...props} className={cn('mt-casual', className)}>
			{children}
		</div>
	)
}

export type ArticleCardTitleProps = ComponentProps<'h3'>

export function ArticleCardTitle({
	children,
	className,
	...props
}: ArticleCardTitleProps) {
	return (
		<h3
			{...props}
			className={cn(
				'mb-best-friends typography-title mt-bff line-clamp-2',
				className,
			)}
		>
			{children}
		</h3>
	)
}

export type ArticleCardDateProps = ComponentProps<'div'>

export function ArticleCardDate({
	children,
	className,
	...props
}: ArticleCardDateProps) {
	if (!children) return null

	return (
		<div
			{...props}
			className={cn(
				'mb-best-friends text-foreground-muted text-xl font-bold',
				className,
			)}
		>
			{children}
		</div>
	)
}

export type ArticleCardDescriptionProps = ComponentProps<'p'>

export function ArticleCardDescription({
	children,
	className,
	...props
}: ArticleCardDescriptionProps) {
	if (!children) return null

	return (
		<div
			{...props}
			className={cn('text-foreground-muted mt-0 line-clamp-2', className)}
		>
			{children}
		</div>
	)
}

export type ArticleCardCategoryProps = ComponentProps<'div'>

export function ArticleCardCategory({
	children,
	className,
	...props
}: ArticleCardCategoryProps) {
	if (!children) return null

	const value = typeof children === 'string' ? children : undefined

	return (
		<Badge
			variant="default"
			{...props}
			className={cn(
				'mb-best-friends bg-background-muted px-best-friends py-best-friends relative text-sm',
				getCategoryColors(value),
				className,
			)}
		>
			<span className="sr-only">Category: </span>
			{children}
		</Badge>
	)
}

export interface ArticleCardProps extends ComponentProps<'div'> {
	href?: string
	title?: string
}

export function ArticleCard({
	href,
	title,
	children,
	className,
	...props
}: ArticleCardProps) {
	return (
		<article
			className={cn('group relative w-full outline-none', className)}
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
		</article>
	)
}
