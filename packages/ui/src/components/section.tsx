import { cx } from '@nerdfish/utils'
import { Slot } from '@radix-ui/react-slot'
import * as React from 'react'

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
			className={cx('container mx-auto px-4 py-24 md:py-32', className)}
			{...props}
		/>
	)
})

Section.displayName = 'Section'
