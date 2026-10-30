'use client'

import { type ComponentType, type ElementType, useState } from 'react'
import Link from 'next/link'

import { useMountEffect } from '@repo/lib/hooks/use-mount-effect'
import { cn } from '@repo/lib/utils/class'

import { ArrowIcon } from '../icons'

import {
	ArrowLinkLeadingLabel,
	ArrowLinkTrailingLabel,
	type ArrowLinkProps,
} from './arrow-link-shared'

export type { ArrowLinkProps }

type ArrowLinkImpl = ComponentType<ArrowLinkProps>
type BackLinkImpl = ComponentType<
	{ href: string } & Pick<ArrowLinkProps, 'className' | 'children' | 'as'>
>

function prefersReducedMotion() {
	return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function scheduleIdle(callback: () => void) {
	if (typeof window.requestIdleCallback === 'function') {
		const id = window.requestIdleCallback(callback, { timeout: 2000 })
		return () => window.cancelIdleCallback(id)
	}

	const id = window.setTimeout(callback, 200)
	return () => window.clearTimeout(id)
}

function preloadArrowLink() {
	return import('./arrow-link-impl')
}

function StaticArrowLink({
	children,
	direction = 'right',
	className,
	href,
	as,
	onIntent,
}: ArrowLinkProps & { onIntent: () => void }) {
	const Tag: ElementType = as ?? (href ? Link : 'span')

	return (
		<Tag
			href={href ?? '#'}
			className={cn(
				'space-x-friends text-foreground focus-visible:ring-ring inline-flex cursor-pointer items-center text-left text-lg font-bold no-underline! transition outline-none focus-visible:ring-2',
				className,
			)}
			onMouseEnter={onIntent}
			onFocus={onIntent}
		>
			<ArrowLinkLeadingLabel direction={direction}>
				{children}
			</ArrowLinkLeadingLabel>

			<div className="p-best-friends relative inline-flex size-14 flex-none items-center justify-center">
				<span>
					<ArrowIcon size={20} direction={direction} />
				</span>
			</div>

			<ArrowLinkTrailingLabel direction={direction}>
				{children}
			</ArrowLinkTrailingLabel>
		</Tag>
	)
}

function StaticBackLink({
	href,
	className,
	children,
	as,
	onIntent,
}: { href: string; onIntent: () => void } & Pick<
	ArrowLinkProps,
	'className' | 'children' | 'as'
>) {
	const Tag: ElementType = as ?? Link

	return (
		<Tag
			href={href}
			className={cn(
				'text-foreground space-x-friends focus-visible:ring-ring flex outline-none focus-visible:ring-2',
				className,
			)}
			onMouseEnter={onIntent}
			onFocus={onIntent}
		>
			<span>
				<ArrowIcon size={20} direction="left" />
			</span>
			<span>{children}</span>
		</Tag>
	)
}

/** Progressive ArrowLink — motion loads after idle / intent. */
export function ArrowLink(props: ArrowLinkProps) {
	const [Impl, setImpl] = useState<ArrowLinkImpl | null>(null)

	useMountEffect(() => {
		if (prefersReducedMotion()) return

		return scheduleIdle(() => {
			void preloadArrowLink().then((mod) => {
				setImpl(() => mod.ArrowLink)
			})
		})
	})

	function handleIntent() {
		if (Impl || prefersReducedMotion()) return
		void preloadArrowLink().then((mod) => {
			setImpl(() => mod.ArrowLink)
		})
	}

	if (!Impl) {
		return <StaticArrowLink {...props} onIntent={handleIntent} />
	}

	return <Impl {...props} />
}

/** Progressive BackLink — motion loads after idle / intent. */
export function BackLink(
	props: { href: string } & Pick<
		ArrowLinkProps,
		'className' | 'children' | 'as'
	>,
) {
	const [Impl, setImpl] = useState<BackLinkImpl | null>(null)

	useMountEffect(() => {
		if (prefersReducedMotion()) return

		return scheduleIdle(() => {
			void preloadArrowLink().then((mod) => {
				setImpl(() => mod.BackLink)
			})
		})
	})

	function handleIntent() {
		if (Impl || prefersReducedMotion()) return
		void preloadArrowLink().then((mod) => {
			setImpl(() => mod.BackLink)
		})
	}

	if (!Impl) {
		return <StaticBackLink {...props} onIntent={handleIntent} />
	}

	return <Impl {...props} />
}
