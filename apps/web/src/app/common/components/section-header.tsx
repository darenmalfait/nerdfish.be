import { H1, type H2 } from '@nerdfish/ui'
import { cx } from '@nerdfish/utils'
import { TextSlideUp } from '@nerdfish-website/ui/components'
import * as React from 'react'
import { ArrowLink } from './arrow-link'

export const SectionHeaderTitle = React.forwardRef<
	React.ElementRef<typeof H2>,
	React.ComponentPropsWithoutRef<typeof H2>
>(function SectionHeaderTitle({ children, className, ...props }, ref) {
	if (!children || children === '') return null

	return (
		<H1
			as="h2"
			variant="primary"
			blurredClassName="hidden"
			ref={ref}
			className={cx('mb-lg max-w-7xl font-semibold', className)}
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
		<p
			className={cx(
				'text-muted max-w-7xl text-xl font-semibold lg:text-2xl',
				className,
			)}
			ref={ref}
			{...props}
		>
			{children}
		</p>
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
