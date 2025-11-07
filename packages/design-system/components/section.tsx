import { Slot } from '@radix-ui/react-slot'
import { cx } from '@repo/lib/utils/base'
import { type ElementType, type ComponentProps } from 'react'
import { ArrowLink } from './arrow-link'
import { TextBalancer } from './text-balancer'
import { TextSlideUp } from './text-slide-up'

export interface SectionProps extends ComponentProps<'section'> {
	asChild?: boolean
	compact?: boolean
}

export function Section({
	className,
	asChild,
	compact,
	...props
}: SectionProps) {
	const Component = asChild ? Slot : 'section'

	return (
		<Component
			className={cx(
				'rounded-container container',
				compact ? 'py-casual' : 'py-distant md:py-strangers',
				className,
			)}
			{...props}
		/>
	)
}

export interface SectionHeaderTitleProps extends ComponentProps<'h2'> {
	as?: ElementType
}

export function SectionHeaderTitle({
	children,
	className,
	...props
}: SectionHeaderTitleProps) {
	if (!children || children === '') return null

	return (
		<h2
			className={cx(
				'typography-heading-sm mb-friends font-title max-w-7xl leading-[1.1]',
				className,
			)}
			{...props}
		>
			<TextBalancer>{children}</TextBalancer>
		</h2>
	)
}

export interface SectionHeaderSubtitleProps extends ComponentProps<'h2'> {
	as?: ElementType
}

export function SectionHeaderSubtitle({
	children,
	className,
	...props
}: SectionHeaderSubtitleProps) {
	if (!children || children === '') return null

	return (
		<div
			className={cx('text-foreground-muted typography-title', className)}
			{...props}
		>
			<TextBalancer>{children}</TextBalancer>
		</div>
	)
}

export interface SectionHeaderProps extends ComponentProps<'header'> {
	cta?: {
		title: string
		url: string
		as?: ElementType
	}
	as?: ElementType
	eager?: boolean
	skipAnimation?: boolean
}

export function SectionHeader({
	children,
	className,
	cta,
	as,
	eager,
	skipAnimation,
	...props
}: SectionHeaderProps) {
	const Element = as ?? 'header'

	if (!children) return null

	if (skipAnimation) {
		return (
			<Element className={cx('mb-acquaintances', className)} {...props}>
				{children}
				{cta?.url ? (
					<div className="mt-casual flex justify-start">
						<ArrowLink as={cta.as} href={cta.url} direction="right">
							{cta.title}
						</ArrowLink>
					</div>
				) : null}
			</Element>
		)
	}
	return (
		<Element className={cx('mb-acquaintances', className)} {...props}>
			<TextSlideUp eager={eager}>
				{children}
				{cta?.url ? (
					<div className="mt-casual flex justify-start">
						<ArrowLink as={cta.as} href={cta.url} direction="right">
							{cta.title}
						</ArrowLink>
					</div>
				) : null}
			</TextSlideUp>
		</Element>
	)
}
