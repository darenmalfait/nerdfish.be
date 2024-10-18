import { cx } from '@nerdfish/utils'
import * as React from 'react'

export const ScrollIndicator = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement> & {
		asChild?: boolean
	}
>(function ScrollIndicator({ className, children, ...props }, ref) {
	return (
		<div
			ref={ref}
			{...props}
			className={cx(
				'text-muted relative h-[15px] w-[43px] md:h-[38px] md:w-[26px]',
				'before:hidden md:border-2 md:before:block',
				'before:animate-scrollIndicator before:empty-content before:bg-inverted rounded-full border-black/40 transition-all before:absolute before:left-1/2 before:top-1.5 before:h-[7px] before:w-[2px] before:-translate-x-1/2 before:rounded-full before:delay-700 dark:border-white/40',
				className,
			)}
		>
			<svg
				aria-hidden
				stroke="currentColor"
				className={cx(
					'md:hidden',
					'border-muted absolute inset-0 animate-bounce duration-1000 ease-in-out dark:border-white/40',
				)}
				viewBox="0 0 43 15"
			>
				<path d="M1 1l20.5 12L42 1" strokeWidth="2" fill="none" />
			</svg>
			{children}
		</div>
	)
})
