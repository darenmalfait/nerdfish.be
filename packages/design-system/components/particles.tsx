'use client'

import { motion } from 'motion/react'

const PARTICLES = Array.from({ length: 6 }, (_, i) => ({
	left: 20 + ((i * 17) % 60),
	top: 20 + ((i * 23) % 60),
	x: (i % 5) * 4 - 10,
	delay: i * 0.2,
}))

export function Particles() {
	return (
		<>
			{PARTICLES.map((particle) => (
				<motion.div
					key={`${particle.left}-${particle.top}`}
					className="bg-background-inverted/60 absolute h-1 w-1 rounded-full"
					style={{
						left: `${particle.left}%`,
						top: `${particle.top}%`,
					}}
					animate={{
						y: [-10, -20, -10],
						x: [0, particle.x, 0],
						opacity: [0, 1, 0],
						scale: [0, 1, 0],
					}}
					transition={{
						duration: 2,
						repeat: Number.POSITIVE_INFINITY,
						delay: particle.delay,
						ease: 'easeInOut',
					}}
				/>
			))}
		</>
	)
}
