'use client'

import { cx } from '@nerdfish/utils'
import { motion } from 'motion/react'
import Image from 'next/image'
import Link from 'next/link'
import * as React from 'react'
import { ArrowRightIcon } from '../lib/icons'
import { getCategoryColors } from './category-indicator'
import { Cursor } from './cursor'
import { DateFormatter } from './date-formatter'
import { TextBalancer } from './text-balancer'
import { Badge, H2, type H3, Skeleton } from './ui'

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
				className="bg-popover before:empty-content before:rounded-container before:bg-muted/50 before:-z-1 flex size-16 items-center justify-center rounded-full text-current transition-transform before:absolute before:inset-0 group-active:scale-125"
				transition={{ type: 'spring', stiffness: 300, damping: 30 }}
			>
				<ArrowRightIcon className="size-8" />
				{children}
			</motion.div>
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
	if (!src) return null

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
					className="rounded-container absolute inset-0 size-full object-cover"
					src={src}
					width={550}
					height={550}
					alt={alt ?? ''}
					placeholder={base64Placeholder ? 'blur' : undefined}
					blurDataURL={base64Placeholder}
				/>
			) : null}

			<ReadMoreCursor>
				<span className="sr-only">{readMoreLabel}</span>
			</ReadMoreCursor>
		</div>
	)
}

export interface ArticleCardContentProps extends React.ComponentProps<'div'> {
	children: React.ReactNode
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

export type ArticleCardTitleProps = React.ComponentProps<typeof H3>

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
			<TextBalancer>{children}</TextBalancer>
		</H2>
	)
}

export interface ArticleCardDateProps extends React.ComponentProps<'div'> {
	value?: string
}

export function ArticleCardDate({
	value,
	className,
	...props
}: ArticleCardDateProps) {
	if (!value) return null

	return (
		<div
			{...props}
			className={cx('mb-sm text-muted text-xl font-bold', className)}
		>
			<DateFormatter dateString={value} format="PPP" />
		</div>
	)
}

export type ArticleCardDescriptionProps = React.ComponentProps<'p'>

export function ArticleCardDescription({
	children,
	className,
	...props
}: ArticleCardDescriptionProps) {
	if (!children) return null

	return (
		<div {...props} className={cx('text-muted mt-0 line-clamp-2', className)}>
			{children}
		</div>
	)
}

export type ArticleCardCategoryProps = React.ComponentProps<'div'>

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
				'mb-sm bg-muted px-md py-sm relative text-sm',
				getCategoryColors(value),
				className,
			)}
		>
			<span className="sr-only">Category: </span>
			{children}
		</Badge>
	)
}

export interface ArticleCardProps extends React.ComponentProps<'div'> {
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
		<div
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
}
