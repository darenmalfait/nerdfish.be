'use client'

import { cn } from '@repo/lib/utils/class'
import { AnimatePresence, motion } from 'motion/react'
import { type ReactNode } from 'react'

const variants = {
	initial: { opacity: 0, y: '10%', scale: 0.1 },
	animate: { opacity: 1, y: 0, scale: 1 },
	exit: { opacity: 0, y: '10%', scale: 0.1 },
}

export function TestimonialsMotionFrame({
	itemKey,
	variant,
	children,
}: {
	itemKey: number
	variant?: 'primary' | 'secondary'
	children: ReactNode
}) {
	return (
		<AnimatePresence mode="popLayout">
			<motion.div
				key={itemKey}
				initial="initial"
				animate="animate"
				exit="exit"
				className={cn('flex w-full flex-col items-center justify-center', {
					'min-h-[80vh]': variant !== 'secondary',
				})}
				variants={variants}
				transition={{
					type: 'spring',
					stiffness: 200,
					damping: 20,
					duration: 0.5,
				}}
			>
				{children}
			</motion.div>
		</AnimatePresence>
	)
}
