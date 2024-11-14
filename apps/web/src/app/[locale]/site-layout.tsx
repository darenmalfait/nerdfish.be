'use client'

import { LoadingAnimation } from '@nerdfish/ui'
import { Section } from '@nerdfish-website/ui/components'
import { useScroll, useTransform, motion } from 'motion/react'
import * as React from 'react'
import { SiteFooter, SiteHeader } from '../common'

export function SiteLayout({ children }: { children: React.ReactNode }) {
	const ref = React.useRef<HTMLDivElement>(null)

	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ['start end', 'end end'],
	})

	const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95])

	return (
		<div className="flex min-h-screen flex-col">
			<SiteHeader />

			<motion.main
				role="main"
				className="rounded-semi relative w-full flex-1"
				style={{ scale }}
			>
				<div className="bg-primary -z-1 rounded-semi absolute inset-0" />
				<React.Suspense
					fallback={
						<Section className="motion-preset-fade motion-delay-1000 motion-duration-1000 flex min-h-screen justify-center">
							<LoadingAnimation className="size-8" variant="square" />
						</Section>
					}
				>
					{children}
				</React.Suspense>
			</motion.main>

			<SiteFooter ref={ref} />
		</div>
	)
}
