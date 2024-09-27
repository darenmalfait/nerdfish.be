import { cx } from '@nerdfish/utils'
import * as React from 'react'

export const BigTitle = React.forwardRef<
	HTMLHeadingElement,
	React.ComponentPropsWithRef<'h1'> & {
		as?: React.ElementType
	}
>(function BigTitle({ as, className, ...props }, ref) {
	const Tag = as ?? 'h1'

	return (
		<Tag
			{...props}
			className={cx(
				'text-primary font-sans text-6xl font-black capitalize leading-none sm:text-[11.6250vw] 2xl:text-[12rem]',
				className,
			)}
			ref={ref}
		>
			{props.children}
		</Tag>
	)
})
