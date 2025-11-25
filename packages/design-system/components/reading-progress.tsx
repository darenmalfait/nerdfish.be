'use client'

import NumberFlow from '@number-flow/react'
import { cn } from '@repo/lib/utils/class'
import { useEffect, useState } from 'react'

export interface ReadingProgressProps {
	offset?: number
	title?: string
}

export function ReadingProgress({ offset = 0, title }: ReadingProgressProps) {
	const [completion, setCompletion] = useState(0)

	useEffect(() => {
		function updateScrollCompletion() {
			// see how much we have scrolled
			const currentProgress = window.scrollY
			// see how much total scroll is available
			const scrollHeight =
				document.body.scrollHeight - window.innerHeight - offset
			if (scrollHeight) {
				// max scroll completion is 100%
				setCompletion(
					Math.min(Number((currentProgress / scrollHeight).toFixed(2)), 1),
				)
			}
		}

		window.addEventListener('scroll', updateScrollCompletion)

		return () => {
			window.removeEventListener('scroll', updateScrollCompletion)
		}
	}, [offset])

	return (
		<div aria-hidden className="fixed inset-x-0 bottom-8 z-40 container">
			<div
				className={cn(
					'gap-best-friends rounded-container bg-popover p-best-friends mx-auto flex w-fit max-w-full items-center text-sm font-bold md:text-base',
					'before:empty-content before:rounded-container before:absolute before:inset-0',
				)}
			>
				{title ? (
					<span className="flex-1 truncate whitespace-nowrap">{title}</span>
				) : null}
				<NumberFlow
					value={completion}
					format={{ style: 'percent' }} // Intl.NumberFormat options
					locales="nl-BE" // Intl.NumberFormat locales
				/>
			</div>
		</div>
	)
}
