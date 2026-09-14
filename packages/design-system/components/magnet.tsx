'use client'

import { Button } from '@nerdfish/react/button'
import { useMountEffect } from '@repo/lib/hooks/use-mount-effect'
import { type ComponentProps, type ComponentType, useState } from 'react'

export type MagnetButtonProps = ComponentProps<typeof Button>

type MagnetButtonImpl = ComponentType<MagnetButtonProps>

function prefersReducedMotion() {
	return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function scheduleIdle(callback: () => void) {
	if (typeof window.requestIdleCallback === 'function') {
		const id = window.requestIdleCallback(callback, { timeout: 2000 })
		return () => window.cancelIdleCallback(id)
	}

	const id = window.setTimeout(callback, 200)
	return () => window.clearTimeout(id)
}

function preloadMagnet() {
	return import('./magnet-impl')
}

/** Progressive magnet: plain Button until idle, then upgrades. motion stays off the critical path. */
export function MagnetButton(props: MagnetButtonProps) {
	const [Impl, setImpl] = useState<MagnetButtonImpl | null>(null)

	useMountEffect(() => {
		if (prefersReducedMotion()) return

		return scheduleIdle(() => {
			void preloadMagnet().then((mod) => {
				setImpl(() => mod.MagnetButton)
			})
		})
	})

	function onIntent() {
		if (Impl || prefersReducedMotion()) return
		void preloadMagnet().then((mod) => {
			setImpl(() => mod.MagnetButton)
		})
	}

	if (!Impl) {
		const { onMouseEnter, onFocus, ...rest } = props

		return (
			<Button
				{...rest}
				onMouseEnter={(event) => {
					onIntent()
					onMouseEnter?.(event)
				}}
				onFocus={(event) => {
					onIntent()
					onFocus?.(event)
				}}
			/>
		)
	}

	return <Impl {...props} />
}
