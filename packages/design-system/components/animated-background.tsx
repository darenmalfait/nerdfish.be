'use client'

import { useMountEffect } from '@repo/lib/hooks/use-mount-effect'
import { cn } from '@repo/lib/utils/class'
import {
	Children,
	cloneElement,
	type ComponentType,
	type ReactElement,
	useState,
} from 'react'
import { type AnimatedBackgroundProps } from './animated-background-impl'

export type { AnimatedBackgroundProps } from './animated-background-impl'

type AnimatedBackgroundImpl = ComponentType<AnimatedBackgroundProps>

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

function preloadAnimatedBackground() {
	return import('./animated-background-impl')
}

function StaticBackground({
	children,
}: Pick<AnimatedBackgroundProps, 'children'>) {
	if (!children) return null

	// eslint-disable-next-line @nerdfish/conventions/map-transformer-name
	return Children.map(children, (child: ReactElement, index) =>
		cloneElement(child, {
			key: index,
			// @ts-expect-error - cloneElement className merge
			className: cn('relative inline-flex', (child as any).props.className),
		}),
	)
}

/** Progressive animated nav pill — motion loads after idle / intent. */
export function AnimatedBackground(props: AnimatedBackgroundProps) {
	const [Impl, setImpl] = useState<AnimatedBackgroundImpl | null>(null)

	useMountEffect(() => {
		if (prefersReducedMotion()) return

		return scheduleIdle(() => {
			void preloadAnimatedBackground().then((mod) => {
				setImpl(() => mod.AnimatedBackground)
			})
		})
	})

	function handleIntent() {
		if (Impl || prefersReducedMotion()) return
		void preloadAnimatedBackground().then((mod) => {
			setImpl(() => mod.AnimatedBackground)
		})
	}

	if (!Impl) {
		return (
			<span onMouseEnter={handleIntent} onFocusCapture={handleIntent}>
				<StaticBackground>{props.children}</StaticBackground>
			</span>
		)
	}

	return <Impl {...props} />
}
