import { cva, cx, type VariantProps } from '@repo/lib/utils/base'
import { ArrowRight } from 'lucide-react'
import * as React from 'react'

export const arrowIconVariants = cva('', {
	variants: {
		direction: {
			up: '-rotate-90',
			right: 'rotate-0',
			down: 'rotate-90',
			left: '-rotate-180',
		},
	},
	defaultVariants: {
		direction: 'right',
	},
})

export type ArrowIconVariants = VariantProps<typeof arrowIconVariants>

export interface ArrowIconProps
	extends ArrowIconVariants,
		Omit<React.ComponentProps<'svg'>, 'direction'> {
	size?: number
}

export function ArrowIcon({
	size = 24,
	direction,
	className,
	...props
}: ArrowIconProps) {
	return (
		<ArrowRight
			width={size}
			height={size}
			className={cx(arrowIconVariants({ direction }), className)}
			{...props}
		/>
	)
}
