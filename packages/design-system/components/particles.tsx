'use client'

import { motion } from 'motion/react'

export function Particles() {
	return (
		<>
			{[...Array(6)].map((_, i) => (
				<motion.div
					key={i}
					className="bg-background-inverted/60 absolute h-1 w-1 rounded-full"
					style={{
						left: `${20 + Math.random() * 60}%`,
						top: `${20 + Math.random() * 60}%`,
					}}
					animate={{
						y: [-10, -20, -10],
						x: [0, Math.random() * 20 - 10, 0],
						opacity: [0, 1, 0],
						scale: [0, 1, 0],
					}}
					transition={{
						duration: 2,
						repeat: Number.POSITIVE_INFINITY,
						delay: i * 0.2,
						ease: 'easeInOut',
					}}
				/>
			))}
		</>
	)
}
