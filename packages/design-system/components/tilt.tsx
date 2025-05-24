'use client'

import {
	type SpringOptions,
	motion,
	useMotionTemplate,
	useMotionValue,
	useSpring,
	useTransform,
} from 'motion/react'
import * as React from 'react'

export interface TiltProps extends React.ComponentProps<typeof motion.div> {
	rotationFactor?: number
	isReverse?: boolean
	springOptions?: SpringOptions
	as?: React.ElementType
}

export function Tilt({
	children,
	className,
	style,
	rotationFactor = 15,
	isReverse = true,
	springOptions,
	ref,
	as,
	...props
}: TiltProps) {
	const itemRef = React.useRef<HTMLDivElement>(null)
	React.useImperativeHandle(ref, () => itemRef.current as HTMLDivElement)

	const x = useMotionValue(0)
	const y = useMotionValue(0)

	const xSpring = useSpring(x, springOptions)
	const ySpring = useSpring(y, springOptions)

	const rotateX = useTransform(
		ySpring,
		[-0.5, 0.5],
		isReverse
			? [rotationFactor, -rotationFactor]
			: [-rotationFactor, rotationFactor],
	)
	const rotateY = useTransform(
		xSpring,
		[-0.5, 0.5],
		isReverse
			? [-rotationFactor, rotationFactor]
			: [rotationFactor, -rotationFactor],
	)

	const transform = useMotionTemplate`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`

	function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
		if (!itemRef.current) return

		const rect = itemRef.current.getBoundingClientRect()
		const width = rect.width
		const height = rect.height
		const mouseX = e.clientX - rect.left
		const mouseY = e.clientY - rect.top

		const xPos = mouseX / width - 0.5
		const yPos = mouseY / height - 0.5

		x.set(xPos)
		y.set(yPos)
	}

	function handleMouseLeave() {
		x.set(0)
		y.set(0)
	}

	const Component = as ? motion(as) : motion.div

	return (
		<Component
			{...props}
			ref={itemRef}
			className={className}
			style={{
				transformStyle: 'preserve-3d',
				...style,
				transform,
			}}
			onMouseMove={handleMouseMove}
			onMouseLeave={handleMouseLeave}
		>
			{children}
		</Component>
	)
}
