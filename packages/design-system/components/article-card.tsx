'use client'

import { cx } from '@repo/lib/utils/base'
import { motion } from 'motion/react'
import { Cursor } from 'motion-cursor'
import Image from 'next/image'
import Link from 'next/link'
import { type ComponentProps, type ReactNode, useState } from 'react'
import { ArrowRightIcon } from '../icons'
import { getCategoryColors } from './category-indicator'
import { Badge, Button, H2, type H3, Skeleton } from './ui'

function ReadMoreCursor({
	active,
	readMoreLabel,
}: {
	active: boolean
	readMoreLabel: string
}) {
	if (!active) return null
	return (
		<Cursor className="group fixed z-50 !bg-transparent">
			<Button
				variant="default"
				asChild
				size="xl"
				className="bg-inverted/50 backdrop-blur-2xl"
			>
				<div className="flex items-center justify-center">
					<span className="mr-md">{readMoreLabel}</span>
					<ArrowRightIcon className="size-6" />
				</div>
			</Button>
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
			className={cx(
				'aspect-h-4 aspect-w-3 rounded-container shadow-outline ring-offset-inverted relative overflow-hidden ring-2 ring-transparent ring-offset-2 group-hover:ring-2 group-hover:ring-current group-focus:ring-current',
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
		<div {...props} className={cx('mt-md', className)}>
			{children}
		</div>
	)
}

export type ArticleCardTitleProps = ComponentProps<typeof H3>

export function ArticleCardTitle({
	children,
	className,
	...props
}: ArticleCardTitleProps) {
	return (
		<H2
			as="h3"
			variant="primary"
			{...props}
			className={cx('mb-sm !mt-0 line-clamp-2', className)}
		>
			{children}
		</H2>
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
			className={cx('mb-sm text-foreground-muted text-xl font-bold', className)}
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
			className={cx('text-foreground-muted mt-0 line-clamp-2', className)}
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
			className={cx(
				'mb-sm bg-background-muted px-md py-sm relative text-sm',
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
		</article>
	)
}
