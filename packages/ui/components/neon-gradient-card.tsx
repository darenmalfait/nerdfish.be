'use client'

import { cx } from '@nerdfish/utils'
import {
	type CSSProperties,
	type ReactElement,
	type ReactNode,
	useEffect,
	useRef,
	useState,
} from 'react'

interface NeonColorsProps {
	firstColor: string
	secondColor: string
}

interface NeonGradientCardProps {
	/**
	 * @default <div />
	 * @type ReactElement
	 * @description
	 * The component to be rendered as the card
	 * */
	as?: ReactElement
	/**
	 * @default ""
	 * @type string
	 * @description
	 * The className of the card
	 */
	className?: string

	/**
	 * @default ""
	 * @type ReactNode
	 * @description
	 * The children of the card
	 * */
	children?: ReactNode

	/**
	 * @default 5
	 * @type number
	 * @description
	 * The size of the border in pixels
	 * */
	borderSize?: number

	/**
	 * @default 20
	 * @type number
	 * @description
	 * The size of the radius in pixels
	 * */
	borderRadius?: number

	/**
	 * @default "{ firstColor: '#ff00aa', secondColor: '#00FFF1' }"
	 * @type string
	 * @description
	 * The colors of the neon gradient
	 * */
	neonColors?: NeonColorsProps

	// biome-ignore lint/suspicious/noExplicitAny: any is fine here, don't care
	[key: string]: any
}

export function NeonGradientCard({
	className,
	children,
	borderSize = 2,
	borderRadius = 20,
	neonColors = {
		firstColor: '#ff00aa',
		secondColor: '#00FFF1',
	},
	...props
}: NeonGradientCardProps) {
	const containerRef = useRef<HTMLDivElement>(null)
	const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

	useEffect(() => {
		const updateDimensions = () => {
			if (containerRef.current) {
				const { offsetWidth, offsetHeight } = containerRef.current
				setDimensions({ width: offsetWidth, height: offsetHeight })
			}
		}

		updateDimensions()
		window.addEventListener('resize', updateDimensions)

		return () => {
			window.removeEventListener('resize', updateDimensions)
		}
	}, [])

	useEffect(() => {
		if (containerRef.current) {
			const { offsetWidth, offsetHeight } = containerRef.current
			setDimensions({ width: offsetWidth, height: offsetHeight })
		}
	}, [])

	return (
		<div
			ref={containerRef}
			style={
				{
					'--border-size': `${borderSize}px`,
					'--border-radius': `${borderRadius}px`,
					'--neon-first-color': neonColors.firstColor,
					'--neon-second-color': neonColors.secondColor,
					'--card-width': `${dimensions.width}px`,
					'--card-height': `${dimensions.height}px`,
					'--card-content-radius': `${borderRadius - borderSize}px`,
					'--pseudo-element-background-image': `linear-gradient(0deg, ${neonColors.firstColor}, ${neonColors.secondColor})`,
					'--pseudo-element-width': `${dimensions.width + borderSize * 2}px`,
					'--pseudo-element-height': `${dimensions.height + borderSize * 2}px`,
					'--after-blur': `${dimensions.width / 3}px`,
				} as CSSProperties
			}
			className={cx(
				'relative z-10 size-full rounded-[var(--border-radius)]',
				className
			)}
			{...props}
		>
			<div
				className={cx(
					'relative size-full min-h-[inherit] rounded-[var(--card-content-radius)] bg-primary p-6',
					'before:-left-[var(--border-size)] before:-top-[var(--border-size)] before:-z-10 before:absolute before:block',
					"before:h-[var(--pseudo-element-height)] before:w-[var(--pseudo-element-width)] before:rounded-[var(--border-radius)] before:content-['']",
					'before:bg-[length:100%_200%] before:bg-[linear-gradient(0deg,var(--neon-first-color),var(--neon-second-color))]',
					'before:animate-background-position-spin',
					'after:-left-[var(--border-size)] after:-top-[var(--border-size)] after:-z-10 after:absolute after:block',
					"after:h-[var(--pseudo-element-height)] after:w-[var(--pseudo-element-width)] after:rounded-[var(--border-radius)] after:blur-[var(--after-blur)] after:content-['']",
					'after:bg-[length:100%_200%] after:bg-[linear-gradient(0deg,var(--neon-first-color),var(--neon-second-color))] after:opacity-80',
					'after:animate-background-position-spin'
				)}
			>
				{children}
			</div>
		</div>
	)
}
