'use client'

import {
	ScrollIndicator,
	Section,
	TextReveal,
} from '@nerdfish-website/ui/components'
import { motion, useScroll, useTransform } from 'framer-motion'
import * as React from 'react'
import { tinaField } from 'tinacms/dist/react'
import { type PageBlocksTextReveal, type Block } from '~/app/cms'

export function TextRevealBlock(props: Block<PageBlocksTextReveal>) {
	const { label } = props

	const ref = React.useRef<HTMLDivElement>(null)
	const { scrollYProgress } = useScroll({
		target: ref,
	})

	const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.1, 1])

	if (!label) return null

	return (
		<div className="relative">
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
							ref.current?.scrollIntoView({ behavior: 'smooth' })
						}}
					>
						<ScrollIndicator className="motion-preset-fade motion-preset-slide-up motion-duration-700 group-hover:text-primary z-10 block group-hover:border-black dark:group-hover:border-white">
							<span className="sr-only">Scroll down</span>
						</ScrollIndicator>
					</button>
				</div>
				<Section>
					<TextReveal
						ref={ref}
						data-tina-field={tinaField(props, 'label')}
						text={label}
					/>
				</Section>
			</div>
		</div>
	)
}
