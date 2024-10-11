import { cx } from '@nerdfish/utils'
import * as React from 'react'

export const AnimatedText = React.forwardRef<
	HTMLSpanElement,
	Omit<React.ComponentPropsWithRef<'span'>, 'children'> & {
		as?: React.ElementType
		value?: string
		letterClassName?: string
	}
>(function AnimatedText({ as, value, letterClassName, ...props }, ref) {
	const Tag = as ?? 'span'

	const letters = value?.split('')

	return (
		<Tag {...props} aria-label={value} ref={ref}>
			{letters?.map((letter, index) => (
				<span
					className={cx(
						'inline-block transition-colors',
						'hover:animate-rubber cursor-default',
						letterClassName,
					)}
					key={index}
				>
					{letter === ' ' ? '\u00A0' : letter}
				</span>
			))}
		</Tag>
	)
})
