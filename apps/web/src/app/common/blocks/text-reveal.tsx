'use client'

import {
	ScrollIndicator,
	Section,
	TextReveal,
} from '@nerdfish-website/ui/components'
import { cubicBezier, motion, useScroll, useTransform } from 'framer-motion'
import * as React from 'react'
import { tinaField } from 'tinacms/dist/react'
import { type PageBlocksTextReveal, type Block } from '~/app/cms'

export function TextRevealBlock(props: Block<PageBlocksTextReveal>) {
	const { label } = props
	const textRef = React.useRef<HTMLDivElement>(null)
	const backgroundRef = React.useRef<HTMLDivElement>(null)

	const { scrollYProgress } = useScroll({
		target: backgroundRef,
	})

	const scale = useTransform(
		scrollYProgress,
		[0, 0.3, 0.6, 1],
		[1, 1.1, 1.1, 1],
		{
			ease: cubicBezier(0.17, 0.67, 0.83, 0.67),
		},
	)

	if (!label) return null

	return (
		<div className="relative" ref={backgroundRef}>
			<div className="absolute inset-0 overflow-hidden">
				<motion.div
					className="bg-muted rounded-semi mx-md absolute inset-0 overflow-hidden"
					style={{
						scale,
					}}
				/>
			</div>
			<div className="rounded-semi relative">
				<div className="absolute top-12 flex w-full justify-center md:top-24">
					<button
						type="button"
						className="group z-10 p-10"
						onClick={() => {
							textRef.current?.scrollIntoView({ behavior: 'smooth' })
						}}
					>
						<ScrollIndicator className="motion-preset-fade motion-preset-slide-up motion-duration-700 group-hover:text-primary z-10 block group-hover:border-black dark:group-hover:border-white">
							<span className="sr-only">Scroll down</span>
						</ScrollIndicator>
					</button>
				</div>
				<Section>
					<TextReveal
						ref={textRef}
						data-tina-field={tinaField(props, 'label')}
						text={label}
					/>
				</Section>
			</div>
		</div>
	)
}
