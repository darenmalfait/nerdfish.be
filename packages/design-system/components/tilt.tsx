'use client'

import { useMountEffect } from '@repo/lib/hooks/use-mount-effect'
import { type ComponentType, type ElementType, useState } from 'react'
import { type TiltProps } from './tilt-impl'

export type { TiltProps } from './tilt-impl'

type TiltImpl = ComponentType<TiltProps>

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

function preloadTilt() {
	return import('./tilt-impl')
}

/** Progressive tilt — motion loads after idle / hover intent. */
export function Tilt(props: TiltProps) {
	const [Impl, setImpl] = useState<TiltImpl | null>(null)

	useMountEffect(() => {
		if (prefersReducedMotion()) return

		return scheduleIdle(() => {
			void preloadTilt().then((mod) => {
				setImpl(() => mod.Tilt)
			})
		})
	})

	function handleIntent() {
		if (Impl || prefersReducedMotion()) return
		void preloadTilt().then((mod) => {
			setImpl(() => mod.Tilt)
		})
	}

	if (!Impl) {
		const {
			as,
			children,
			className,
			style,
			rotationFactor: _rotationFactor,
			isReverse: _isReverse,
			springOptions: _springOptions,
			onMouseEnter: _onMouseEnter,
			...rest
		} = props

		const Component: ElementType = as ?? 'div'

		return (
			<Component
				{...rest}
				className={className}
				style={{ transformStyle: 'preserve-3d', ...style }}
				onMouseEnter={handleIntent}
			>
				{children}
			</Component>
		)
	}

	return <Impl {...props} />
}
