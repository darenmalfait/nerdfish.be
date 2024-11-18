import { H2 } from '@nerdfish/ui'
import { cx } from '@nerdfish/utils'
import * as React from 'react'
import { ArrowLink } from './arrow-link'

export const SectionHeaderTitle = React.forwardRef<
	React.ElementRef<typeof H2>,
	React.ComponentPropsWithoutRef<typeof H2>
>(function SectionHeaderTitle({ children, className, ...props }, ref) {
	if (!children || children === '') return null

	return (
		<H2 ref={ref} className={className} {...props}>
			{children}
		</H2>
	)
})

export const SectionHeaderSubtitle = React.forwardRef<
	React.ElementRef<typeof H2>,
	React.ComponentPropsWithoutRef<typeof H2>
>(function SectionHeaderSubtitle({ children, className, ...props }, ref) {
	if (!children || children === '') return null

	return (
		<H2 variant="secondary" as="div" className={className} ref={ref} {...props}>
			{children}
		</H2>
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

	if (
		!children ||
		(React.isValidElement(children) && !children.props?.children)
	)
		return null

	return (
		<Element
			ref={ref}
			className={cx(
				'space-y-md mb-lg flex flex-col lg:flex-row lg:items-end lg:justify-between lg:space-y-0',
				className,
			)}
			{...props}
		>
			<div className="space-y-sm">{children}</div>

			{cta?.url ? (
				<ArrowLink href={cta.url} direction="right">
					{cta.title}
				</ArrowLink>
			) : null}
		</Element>
	)
})
