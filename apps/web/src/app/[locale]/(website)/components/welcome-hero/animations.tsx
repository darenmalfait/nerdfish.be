'use client'

import { cn } from '@repo/lib/utils/class'
import { useEffect, useState } from 'react'

type AnimationState = 0 | 1 | 2 | 3

export function AnimationDesign() {
	const [state, setState] = useState<AnimationState>(0)

	useEffect(() => {
		const interval = setInterval(() => {
			setState((prev) => ((prev + 1) % 4) as AnimationState)
		}, 1000)

		return () => clearInterval(interval)
	}, [])

	const row1Triggered = state === 1
	const row2Triggered = state === 3

	return (
		<div className="gap-best-friends flex w-full flex-col">
			<div className="gap-best-friends flex w-full">
				<div
					className={cn(
						row1Triggered ? 'w-[40%]' : 'w-[30%]',
						'transition-all duration-1000',
						'rounded-base p-best-friends h-24 border-2 border-dashed border-current/50',
					)}
				/>
				<div
					className={cn(
						row1Triggered ? 'w-[60%]' : 'w-[70%]',
						'transition-all duration-1000',
						'rounded-base p-best-friends h-24 border-2 border-dashed border-current/50',
					)}
				/>
			</div>
			<div className="gap-best-friends flex w-full">
				<div
					className={cn(
						row2Triggered ? 'w-[60%]' : 'w-[70%]',
						'transition-all duration-1000',
						'rounded-base p-best-friends h-24 border-2 border-dashed border-current/50',
					)}
				/>
				<div
					className={cn(
						row2Triggered ? 'w-[40%]' : 'w-[30%]',
						'transition-all duration-1000',
						'rounded-base p-best-friends h-24 border-2 border-dashed border-current/50',
					)}
				/>
			</div>
		</div>
	)
}
