import { cx } from '@nerdfish/utils'
import * as React from 'react'

export const Section = React.forwardRef<
	HTMLDivElement,
	React.ComponentPropsWithoutRef<'section'>
>(({ className, ...props }, ref) => {
	return (
		<section
			ref={ref}
			className={cx(
				'container mx-auto px-4 py-12 sm:py-24 md:py-32',
				className,
			)}
			{...props}
		/>
	)
})

Section.displayName = 'Section'
