import { H1, type H2 } from '@nerdfish/ui'
import { cx } from '@nerdfish/utils'
import { Slot } from '@radix-ui/react-slot'
import * as React from 'react'
import { ArrowLink } from './arrow-link'
import { TextSlideUp } from './text-slide-up'

export const Section = React.forwardRef<
	HTMLDivElement,
	React.ComponentPropsWithoutRef<'section'> & {
		asChild?: boolean
	}
>(({ className, asChild, ...props }, ref) => {
	const Component = asChild ? Slot : 'section'

	return (
		<Component
			ref={ref}
			className={cx(
				'md:py-3xl rounded-container px-md py-xl container mx-auto',
				className,
			)}
			{...props}
		/>
	)
})

Section.displayName = 'Section'

export const SectionHeaderTitle = React.forwardRef<
	React.ElementRef<typeof H2>,
	React.ComponentPropsWithoutRef<typeof H2>
>(function SectionHeaderTitle({ children, className, ...props }, ref) {
	if (!children || children === '') return null

	return (
		<H1
			as="h2"
			variant="primary"
			ref={ref}
			className={cx('mb-lg max-w-7xl font-bold', className)}
			{...props}
		>
			{children}
		</H1>
	)
})

export const SectionHeaderSubtitle = React.forwardRef<
	React.ElementRef<typeof H2>,
	React.ComponentPropsWithoutRef<typeof H2>
>(function SectionHeaderSubtitle({ children, className, ...props }, ref) {
	if (!children || children === '') return null

	return (
		<div
			className={cx(
				'text-muted max-w-7xl text-xl font-semibold lg:text-2xl',
				className,
			)}
			ref={ref}
			{...props}
		>
			{children}
		</div>
	)
})

export const SectionHeader = React.forwardRef<
	React.ElementRef<'header'>,
	React.ComponentPropsWithoutRef<'header'> & {
		cta?: {
			title: string
			url: string
		}
		as?: React.ElementType
	}
>(function SectionHeader({ cta, as, className, children, ...props }, ref) {
	const Element = as ?? 'header'

	if (!children) return null

	return (
		<Element ref={ref} className={cx('mb-xl', className)} {...props}>
			<TextSlideUp>
				{children}
				{cta?.url ? (
					<div className="mt-lg flex justify-start">
						<ArrowLink href={cta.url} direction="right">
							{cta.title}
						</ArrowLink>
					</div>
				) : null}
			</TextSlideUp>
		</Element>
	)
})

SectionHeader.displayName = 'SectionHeader'
