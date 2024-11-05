'use client'

import { cx } from '@nerdfish/utils'
import {
	motion,
	useAnimationFrame,
	useMotionValue,
	useScroll,
	useSpring,
	useTransform,
	useVelocity,
} from 'framer-motion'
import React, { useEffect, useRef, useState } from 'react'

export const wrap = (min: number, max: number, v: number) => {
	const rangeSize = max - min
	return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min
}

export function Headline({
	children,
	baseVelocity = 1,
	className,
}: {
	children: string
	baseVelocity?: number
	className?: string
}) {
	const baseX = useMotionValue(0)
	const { scrollY } = useScroll()
	const scrollVelocity = useVelocity(scrollY)
	const smoothVelocity = useSpring(scrollVelocity, {
		damping: 50,
		stiffness: 400,
	})

	const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
		clamp: false,
	})

	const [repetitions, setRepetitions] = useState(1)
	const containerRef = useRef<HTMLDivElement>(null)
	const textRef = useRef<HTMLSpanElement>(null)

	useEffect(() => {
		const calculateRepetitions = () => {
			if (containerRef.current && textRef.current) {
				const containerWidth = containerRef.current.offsetWidth
				const textWidth = textRef.current.offsetWidth
				const newRepetitions = Math.ceil(containerWidth / textWidth) + 2
				setRepetitions(newRepetitions)
			}
		}

		calculateRepetitions()

		window.addEventListener('resize', calculateRepetitions)
		return () => window.removeEventListener('resize', calculateRepetitions)
	}, [children])

	const x = useTransform(baseX, (v) => `${wrap(-100 / repetitions, 0, v)}%`)

	const directionFactor = React.useRef<number>(1)
	useAnimationFrame((t, delta) => {
		let moveBy = directionFactor.current * baseVelocity * (delta / 1000)

		if (velocityFactor.get() < 0) {
			directionFactor.current = -1
		} else if (velocityFactor.get() > 0) {
			directionFactor.current = 1
		}

		moveBy += directionFactor.current * moveBy * velocityFactor.get()

		baseX.set(baseX.get() + moveBy)
	})

	return (
		<div
			className="w-full overflow-hidden whitespace-nowrap"
			ref={containerRef}
		>
			<motion.div className={cx('inline-block', className)} style={{ x }}>
				{Array.from({ length: repetitions }).map((_, i) => (
					<span
						aria-hidden={i !== 0}
						key={i}
						className="text-[7vw] font-black uppercase"
						ref={i === 0 ? textRef : null}
					>
						{children}
						{i !== repetitions - 1 ? (
							<span aria-hidden className="mx-md">
								-
							</span>
						) : null}
					</span>
				))}
			</motion.div>
		</div>
	)
}
