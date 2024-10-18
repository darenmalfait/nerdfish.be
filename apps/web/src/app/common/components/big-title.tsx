import { cx } from '@nerdfish/utils'
import capitalize from 'lodash/capitalize'
import * as React from 'react'
import { AnimatedText } from './animated-text'

export const BigTitle = React.forwardRef<
	HTMLHeadingElement,
	Omit<React.ComponentPropsWithRef<'h1'>, 'children'> & {
		as?: React.ElementType
		value?: string
	}
>(function BigTitle({ as, className, value, ...props }, ref) {
	return (
		<AnimatedText
			as={as ?? 'h1'}
			{...props}
			className={cx(
				'text-primary font-sans text-4xl font-black leading-none sm:text-[11.6250vw] sm:leading-[11.6250vw] 2xl:text-[12rem] 2xl:leading-[12rem]',
				className,
			)}
			value={capitalize(value)}
			aria-label={value}
			ref={ref}
		/>
	)
})
