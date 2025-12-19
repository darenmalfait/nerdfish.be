import { cva, cn, type VariantProps } from '@repo/lib/utils/class'
import { ArrowRight } from 'lucide-react'
import { type ComponentProps } from 'react'

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
	extends ArrowIconVariants, Omit<ComponentProps<'svg'>, 'direction'> {
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
			className={cn(arrowIconVariants({ direction }), className)}
			{...props}
		/>
	)
}
