import { H2 } from '@nerdfish/ui'
import { cx } from '@nerdfish/utils'
import * as React from 'react'
import { AnimatedText } from './animated-text'
import { ArrowLink } from './arrow-link'

export const SectionHeaderTitle = React.forwardRef<
	React.ElementRef<typeof H2>,
	React.ComponentPropsWithoutRef<typeof H2> & {
		animatedText?: string
	}
>(function SectionHeaderTitle({ animatedText, children, ...props }, ref) {
	if (!animatedText && !children) return null

	return (
		<H2 ref={ref} {...props}>
			{animatedText ? (
				<AnimatedText
					value={animatedText}
					letterClassName="hover:text-primary"
				/>
			) : null}
			{children}
		</H2>
	)
})

export const SectionHeaderSubtitle = React.forwardRef<
	React.ElementRef<typeof H2>,
	React.ComponentPropsWithoutRef<typeof H2>
>(function SectionHeaderSubtitle({ children, ...props }, ref) {
	if (!children) return null

	return (
		<H2 variant="secondary" as="div" ref={ref} {...props}>
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

	if (!children) return null

	return (
		<Element
			as={as}
			ref={ref}
			className={cx(
				'space-y-md mb-lg flex flex-col lg:flex-row lg:items-end lg:justify-between lg:space-y-0',
				className,
			)}
			{...props}
		>
			<div className="space-y-xs">{children}</div>

			{cta?.url ? (
				<ArrowLink href={cta.url} direction="right">
					{cta.title}
				</ArrowLink>
			) : null}
		</Element>
	)
})
