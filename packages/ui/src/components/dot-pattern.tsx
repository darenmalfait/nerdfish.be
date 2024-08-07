'use client'

import { cx as cn } from '@nerdfish/utils'
import { useId } from 'react'
import * as React from 'react'

export interface DotPatternProps extends React.SVGAttributes<SVGSVGElement> {
	width?: number
	height?: number
	x?: number
	y?: number
	cx?: number
	cy?: number
	cr?: number
}

export const DotPattern = React.forwardRef<SVGSVGElement, DotPatternProps>(
	function DotPattern(
		{
			width = 16,
			height = 16,
			x = 0,
			y = 0,
			cx = 1,
			cy = 1,
			cr = 1,
			className,
			...props
		}: DotPatternProps,
		ref,
	) {
		const id = useId()

		return (
			<svg
				ref={ref}
				aria-hidden="true"
				className={cn(
					'fill-primary/80 pointer-events-none absolute inset-0 h-full w-full',
					className,
				)}
				{...props}
			>
				<defs>
					<pattern
						id={id}
						width={width}
						height={height}
						patternUnits="userSpaceOnUse"
						patternContentUnits="userSpaceOnUse"
						x={x}
						y={y}
					>
						<circle id="pattern-circle" cx={cx} cy={cy} r={cr} />
					</pattern>
				</defs>
				<rect width="100%" height="100%" strokeWidth={0} fill={`url(#${id})`} />
			</svg>
		)
	},
)
