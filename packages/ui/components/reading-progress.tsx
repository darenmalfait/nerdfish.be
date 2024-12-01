'use client'

import { cx } from '@nerdfish/utils'
import NumberFlow from '@number-flow/react'
import * as React from 'react'

export function ReadingProgress({
	offset = 0,
	title,
}: { offset?: number; title?: string }) {
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
					Math.min(Number((currentProgress / scrollHeight).toFixed(2)), 1)
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
			className={
				'container sticky inset-x-0 top-2 z-40 md:fixed md:top-auto md:bottom-8'
			}
		>
			<div
				className={cx(
					'mx-auto flex w-fit max-w-full cursor-pointer items-center gap-sm rounded-container bg-popover p-sm font-bold text-sm md:text-base',
					'before:empty-content before:absolute before:inset-0 before:rounded-container before:bg-muted/50'
				)}
			>
				{title ? (
					<span className="flex-1 truncate whitespace-nowrap ">{title}</span>
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
