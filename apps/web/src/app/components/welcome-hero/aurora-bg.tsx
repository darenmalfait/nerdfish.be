'use client'

import { cx } from '@repo/lib/utils/base'
import { type ComponentProps } from 'react'

interface AuroraBackgroundProps extends ComponentProps<'div'> {
	showRadialGradient?: boolean
}

export function AuroraBackground({
	className,
	children,
	showRadialGradient = true,
	...props
}: AuroraBackgroundProps) {
	return (
		<div
			className={cx(
				'-mt-[106px]',
				'transition-bg bg-background text-primary relative flex h-[100vh] flex-col items-center justify-center',
				className,
			)}
			{...props}
		>
			<div className="absolute inset-0 overflow-hidden">
				<div
					//   I'm sorry but this is what peak developer performance looks like // trigger warning
					className={cx(
						`after:animate-aurora pointer-events-none absolute -inset-[10px] opacity-50 blur-[10px] invert filter will-change-transform [--aurora:repeating-linear-gradient(100deg,var(--blue-500)_10%,var(--indigo-300)_15%,var(--blue-300)_20%,var(--violet-200)_25%,var(--blue-400)_30%)] [--dark-gradient:repeating-linear-gradient(100deg,var(--black)_0%,var(--black)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--black)_16%)] [--white-gradient:repeating-linear-gradient(100deg,var(--white)_0%,var(--white)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--white)_16%)] [background-image:var(--white-gradient),var(--aurora)] [background-position:50%_50%,50%_50%] [background-size:300%,_200%] after:absolute after:inset-0 after:mix-blend-difference after:content-[""] after:[background-attachment:fixed] after:[background-image:var(--white-gradient),var(--aurora)] after:[background-size:200%,_100%] dark:invert-0 dark:[background-image:var(--dark-gradient),var(--aurora)] after:dark:[background-image:var(--dark-gradient),var(--aurora)]`,

						showRadialGradient &&
							`[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,var(--transparent)_70%)]`,
					)}
				/>
			</div>
			{children}
		</div>
	)
}
