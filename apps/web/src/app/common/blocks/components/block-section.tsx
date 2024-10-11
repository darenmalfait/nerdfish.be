import { cx } from '@nerdfish/utils'
import * as React from 'react'

export const BlockSection = React.forwardRef<
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

BlockSection.displayName = 'BlockSection'
