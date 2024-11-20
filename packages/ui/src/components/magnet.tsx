'use client'

import { cx } from '@nerdfish/utils'
import { motion, useMotionValue, useSpring } from 'motion/react'
import * as React from 'react'

const SPRING_CONFIG = { damping: 30, stiffness: 150, mass: 0.2 }
const MAX_DISTANCE = 0.1
const MAX_SCALE = 1.1
const MAX_ROTATE = 20
export const Magnet = React.forwardRef<
	React.ElementRef<typeof motion.div>,
	React.ComponentPropsWithoutRef<typeof motion.div>
>(({ children, className, ...props }, ref) => {
	const itemRef = React.useRef<HTMLDivElement>(null)
	React.useImperativeHandle(ref, () => itemRef.current as HTMLDivElement)

	const [isHovered, setIsHovered] = React.useState(false)
	const x = useMotionValue(0)
	const y = useMotionValue(0)
	const scale = useMotionValue(1)
	const rotate = useMotionValue(0)
	const springX = useSpring(x, SPRING_CONFIG)
	const springY = useSpring(y, SPRING_CONFIG)
	const springScale = useSpring(scale, { damping: 20, stiffness: 300 })
	const springRotate = useSpring(rotate, { damping: 20, stiffness: 300 })

	React.useEffect(() => {
		const calculateDistance = (e: MouseEvent) => {
			if (itemRef.current) {
				const rect = itemRef.current.getBoundingClientRect()
				const centerX = rect.left + rect.width / 2
				const centerY = rect.top + rect.height / 2
				const distanceX = (e.clientX - centerX) * MAX_DISTANCE
				const distanceY = (e.clientY - centerY) * MAX_DISTANCE
				const normalizedX = Math.abs(distanceX) / (rect.width / 2)
				const normalizedY = Math.abs(distanceY) / (rect.height / 2)
				const cornerProximity = Math.min(1, (normalizedX + normalizedY) / 2)
				const rotateValue =
					distanceX > 0
						? distanceY > 0
							? MAX_ROTATE * cornerProximity // bottom right
							: -MAX_ROTATE * cornerProximity // top right
						: distanceY > 0
							? -MAX_ROTATE * cornerProximity // bottom left
							: MAX_ROTATE * cornerProximity // top left

				if (isHovered) {
					x.set(distanceX)
					y.set(distanceY)
					scale.set(MAX_SCALE)
					rotate.set(rotateValue)
				} else {
					x.set(0)
					y.set(0)
					scale.set(1)
					rotate.set(0)
				}
			}
		}

		const handleMouseMove = (e: MouseEvent) => {
			requestAnimationFrame(() => calculateDistance(e))
		}

		document.addEventListener('mousemove', handleMouseMove)
		return () => {
			document.removeEventListener('mousemove', handleMouseMove)
		}
	}, [isHovered, x, y, scale, rotate])

	return (
		<motion.div
			ref={itemRef}
			className={cx('inline-flex', className)}
			onMouseEnter={(e) => {
				setIsHovered(true)
				props.onMouseEnter?.(e)
			}}
			onMouseLeave={(e) => {
				setIsHovered(false)
				props.onMouseLeave?.(e)
			}}
			style={{
				position: 'relative',
				x: springX,
				y: springY,
				scale: springScale,
				rotate: springRotate,
				...props.style,
			}}
			{...props}
		>
			{children}
		</motion.div>
	)
})

Magnet.displayName = 'Magnet'
