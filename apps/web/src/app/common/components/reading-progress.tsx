'use client'

import { Gauge, GaugeText } from '@nerdfish/ui'
import * as React from 'react'

export function ReadingProgress({ offset = 0 }: { offset?: number }) {
	const [completion, setCompletion] = React.useState(0)

	React.useEffect(() => {
		function updateScrollCompletion() {
			// see how much we have scrolled
			const currentProgress = window.scrollY
			// see how much total scroll is available
			const scrollHeight =
				document.body.scrollHeight - window.innerHeight - offset
			if (scrollHeight) {
				// max scroll completion is 100%
				setCompletion(
					Math.round(
						Math.min(
							Number((currentProgress / scrollHeight).toFixed(2)) * 100,
							100,
						),
					),
				)
			}
		}

		window.addEventListener('scroll', updateScrollCompletion)

		return () => {
			window.removeEventListener('scroll', updateScrollCompletion)
		}
	}, [offset])

	return (
		<>
			{/* handhelds */}
			<div
				aria-hidden
				className="fixed left-0 right-0 top-0 z-50 h-1 w-full bg-transparent xl:hidden"
			>
				<div
					className="bg-accent h-1 transition-transform duration-150"
					style={{
						transform: `translateX(${completion - 100}%)`,
					}}
				/>
			</div>
			{/* bigger screen */}
			<div
				aria-hidden
				className="fixed bottom-4 right-4 z-50 hidden flex-col items-center gap-4 xl:flex"
			>
				<Gauge value={completion}>
					<GaugeText fontSize={24} value={`${completion}%`} />
				</Gauge>
				<span className="text-muted-foreground max-w-[100px] text-center text-sm">
					reading progress
				</span>
			</div>
		</>
	)
}
