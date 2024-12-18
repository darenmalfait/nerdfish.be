'use client'

import { cx } from '@nerdfish/utils'
import * as ProgressPrimitive from '@radix-ui/react-progress'
import * as React from 'react'

export type ProgressProps = React.ComponentProps<typeof ProgressPrimitive.Root>

export function Progress({ className, value, ...props }: ProgressProps) {
	return (
		<ProgressPrimitive.Root
			className={cx(
				'bg-secondary relative h-4 w-full overflow-hidden rounded-full',
				className,
			)}
			{...props}
		>
			<ProgressPrimitive.Indicator
				className="bg-accent h-full w-full flex-1 transition-all"
				style={{ transform: `translateX(-${100 - (value ?? 0)}%)` }}
			/>
		</ProgressPrimitive.Root>
	)
}
