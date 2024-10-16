import { Skeleton } from '@nerdfish/ui'
import { cx } from '@nerdfish/utils'
import capitalize from 'lodash/capitalize'
import * as React from 'react'
import { AnimatedText } from './animated-text'

export const BigTitle = React.forwardRef<
	HTMLHeadingElement,
	Omit<React.ComponentPropsWithRef<'h1'>, 'children'> & {
		as?: React.ElementType
		value?: string
		loading?: boolean
	}
>(function BigTitle({ as, className, value, loading, ...props }, ref) {
	if (loading)
		return (
			// lineheight
			<span className="relative max-w-3xl text-4xl sm:text-[11.6250vw] sm:leading-[11.6250vw] 2xl:text-[12rem] 2xl:leading-[12rem]">
				<Skeleton />
			</span>
		)

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
