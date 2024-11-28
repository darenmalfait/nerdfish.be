'use client'

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
							100
						)
					)
				)
			}
		}

		window.addEventListener('scroll', updateScrollCompletion)

		return () => {
			window.removeEventListener('scroll', updateScrollCompletion)
		}
	}, [offset])

	return (
		<div
			aria-hidden
			className="fixed top-0 right-0 left-0 z-50 h-1 w-full bg-transparent"
		>
			<div
				className="h-1 bg-accent transition-transform duration-150"
				style={{
					transform: `translateX(${completion - 100}%)`,
				}}
			/>
		</div>
	)
}
