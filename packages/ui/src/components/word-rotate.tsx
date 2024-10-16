'use client'

import { cx } from '@nerdfish/utils'
import { AnimatePresence, type HTMLMotionProps, motion } from 'framer-motion'
import * as React from 'react'

interface WordRotateProps {
	words: string[]
	duration?: number
	framerProps?: HTMLMotionProps<'span'>
	className?: string
}

export function WordRotate({
	words,
	duration = 2500,
	framerProps = {
		initial: { opacity: 0, y: -50 },
		animate: { opacity: 1, y: 0 },
		exit: { opacity: 0, y: 50 },
		transition: { duration: 0.25, ease: 'easeOut' },
	},
	className,
}: WordRotateProps) {
	const [index, setIndex] = React.useState(0)

	React.useEffect(() => {
		const interval = setInterval(() => {
			setIndex((prevIndex) => (prevIndex + 1) % words.length)
		}, duration)

		// Clean up interval on unmount
		return () => clearInterval(interval)
	}, [words, duration])

	return (
		<div className="overflow-hidden py-2">
			<AnimatePresence mode="wait">
				<motion.span
					key={words[index]}
					className={cx(className)}
					{...framerProps}
				>
					{words[index]}
				</motion.span>
			</AnimatePresence>
		</div>
	)
}
