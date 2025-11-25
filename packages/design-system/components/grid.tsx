'use client'

import { cn } from '@nerdfish/utils/class'
import { Slot } from '@radix-ui/react-slot'
import * as React from 'react'

export const Grid = React.forwardRef<
	HTMLDivElement,
	React.ComponentPropsWithoutRef<'div'> & {
		asChild?: boolean
	}
>(({ asChild, className, ...props }, ref) => {
	const Comp = asChild ? Slot : 'div'

	return (
		<Comp
			ref={ref}
			className={cn(
				'gap-friends grid w-full auto-rows-[22rem] grid-cols-3',
				className,
			)}
			{...props}
		/>
	)
})

Grid.displayName = 'Grid'

export const GridCard = React.forwardRef<
	HTMLDivElement,
	React.ComponentPropsWithoutRef<'div'> & {
		asChild?: boolean
	}
>(({ asChild, className, children, ...props }, ref) => {
	const Comp = asChild ? Slot : 'div'

	return (
		<Comp
			ref={ref}
			className={cn(
				'rounded-container group relative col-span-3 flex flex-col justify-between overflow-hidden',
				// light styles
				'bg-background shadow-outline [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]',
				// dark styles
				'transform-gpu dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]',
				className,
			)}
			{...props}
		>
			{children}
		</Comp>
	)
})
GridCard.displayName = 'GridCard'

export type GridProps = React.ComponentPropsWithoutRef<typeof Grid>
export type GridCardProps = React.ComponentPropsWithoutRef<typeof GridCard>
