'use client'

import { cx } from '@nerdfish/utils'
import { motion, useScroll, useTransform } from 'framer-motion'
import * as React from 'react'

function Word({
	children,
	progress,
	range,
}: {
	children: React.ReactNode
	progress: any
	range: [number, number]
}) {
	const opacity = useTransform(progress, range, [0, 1])

	return (
		<span className="mx-sm relative">
			<span className="absolute opacity-30">{children}</span>
			<motion.span style={{ opacity }} className="text-primary">
				{children}
			</motion.span>
		</span>
	)
}

export const TextReveal = React.forwardRef<
	HTMLDivElement,
	React.ComponentPropsWithoutRef<'div'> & { text?: string }
>(({ text, className, ...props }, ref) => {
	const targetRef = React.useRef<HTMLDivElement | null>(null)
	React.useImperativeHandle(ref, () => targetRef.current as HTMLDivElement)

	const { scrollYProgress } = useScroll({
		target: targetRef,
	})

	if (!text) return null
	const words = text.split(' ')

	return (
		<div
			ref={targetRef}
			className={cx('relative z-0 h-[200vh]', className)}
			{...props}
		>
			<div className="sticky top-0 mx-auto flex h-[40%] items-center bg-transparent">
				<p
					ref={targetRef}
					className="text-primary/20 p-md flex flex-wrap text-2xl font-bold md:text-3xl lg:text-4xl xl:text-5xl"
				>
					{words.map((word, i) => {
						const start = i / words.length
						const end = start + 1 / words.length
						return (
							<Word key={i} progress={scrollYProgress} range={[start, end]}>
								{word}
							</Word>
						)
					})}
				</p>
			</div>
		</div>
	)
})

TextReveal.displayName = 'TextReveal'
