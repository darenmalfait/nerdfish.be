import { Slot } from '@radix-ui/react-slot'
import { cx } from '@repo/lib/utils/base'
import { type ElementType, type ComponentProps } from 'react'
import { ArrowLink } from './arrow-link'
import { TextBalancer } from './text-balancer'
import { TextSlideUp } from './text-slide-up'
import { H1, type H2 } from './ui'

export interface SectionProps extends ComponentProps<'section'> {
	asChild?: boolean
}

export function Section({ className, asChild, ...props }: SectionProps) {
	const Component = asChild ? Slot : 'section'

	return (
		<Component
			className={cx('rounded-container py-xl md:py-3xl container', className)}
			{...props}
		/>
	)
}

export interface SectionHeaderTitleProps extends ComponentProps<typeof H1> {
	as?: ElementType
}

export function SectionHeaderTitle({
	children,
	className,
	...props
}: SectionHeaderTitleProps) {
	if (!children || children === '') return null

	return (
		<H1
			as="h2"
			variant="primary"
			className={cx('mb-lg font-title max-w-7xl leading-[1.1]', className)}
			{...props}
		>
			<TextBalancer>{children}</TextBalancer>
		</H1>
	)
}

export interface SectionHeaderSubtitleProps extends ComponentProps<typeof H2> {
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
			className={cx(
				'text-foreground-muted max-w-7xl text-xl font-semibold lg:text-2xl',
				className,
			)}
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
}

export function SectionHeader({
	children,
	className,
	cta,
	as,
	eager,
	...props
}: SectionHeaderProps) {
	const Element = as ?? 'header'

	if (!children) return null

	return (
		<Element className={cx('mb-xl', className)} {...props}>
			<TextSlideUp eager={eager}>
				{children}
				{cta?.url ? (
					<div className="mt-lg flex justify-start">
						<ArrowLink as={cta.as} href={cta.url} direction="right">
							{cta.title}
						</ArrowLink>
					</div>
				) : null}
			</TextSlideUp>
		</Element>
	)
}
