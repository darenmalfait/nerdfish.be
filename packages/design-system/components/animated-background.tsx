'use client'

import { useControllableState } from '@nerdfish/react/hooks/use-controllable-state'
import { useMountEffect } from '@repo/lib/hooks/use-mount-effect'
import { cn } from '@repo/lib/utils/class'
import { type Transition } from 'motion/react'
import {
	Children,
	cloneElement,
	useId,
	useState,
	type ComponentType,
	type ReactElement,
	type ReactNode,
} from 'react'

export interface AnimatedBackgroundProps {
	children?:
		| ReactElement<{ 'data-id': string }>[]
		| ReactElement<{ 'data-id': string }>
		| any

	defaultValue?: string
	value?: string
	onValueChange?: (newActiveId: string | null) => void
	className?: string
	transition?: Transition
	enableHover?: boolean
}

interface MotionBits {
	AnimatePresence: ComponentType<{
		initial?: boolean
		children?: ReactNode
	}>
	MotionDiv: ComponentType<Record<string, unknown>>
}

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

function loadMotionBits(): Promise<MotionBits> {
	return import('motion/react').then((mod) => ({
		AnimatePresence: mod.AnimatePresence,
		MotionDiv: mod.motion.div,
	}))
}

/**
 * Progressive motion pill for nav (and similar) lists.
 *
 * Motion is loaded after idle / intent, but the child tree stays mounted —
 * swapping a Static→Impl component remounts NavigationMenu items and races
 * Playwright (and users) opening submenus.
 */
export function AnimatedBackground({
	children,
	value,
	defaultValue,
	onValueChange,
	className,
	transition,
	enableHover = false,
}: AnimatedBackgroundProps) {
	const [motionBits, setMotionBits] = useState<MotionBits | null>(null)
	const [activeId, setActiveId] = useControllableState<string | null>({
		prop: value,
		defaultProp: defaultValue ?? null,
		onChange: onValueChange,
	})
	const uniqueId = useId()

	useMountEffect(() => {
		if (prefersReducedMotion()) return

		return scheduleIdle(() => {
			void loadMotionBits().then(setMotionBits)
		})
	})

	function handleIntent() {
		if (motionBits || prefersReducedMotion()) return
		void loadMotionBits().then(setMotionBits)
	}

	function handleSetActiveId(id: string | null) {
		setActiveId(id)
		onValueChange?.(id)
	}

	if (!children) return null

	const AnimatePresence = motionBits?.AnimatePresence
	const MotionDiv = motionBits?.MotionDiv

	return (
		<span
			className="contents"
			onMouseEnter={handleIntent}
			onFocusCapture={handleIntent}
		>
			{/* eslint-disable-next-line @nerdfish/conventions/map-transformer-name */}
			{Children.map(children, (child: ReactElement, index) => {
				const id = (child as ReactElement<{ 'data-id': string }>).props[
					'data-id'
				]

				const interactionProps = enableHover
					? {
							onMouseEnter: () => handleSetActiveId(id),
							onMouseLeave: () => handleSetActiveId(null),
						}
					: {
							onClick: () => handleSetActiveId(id),
						}

				return cloneElement(
					child,
					{
						key: index,
						// @ts-expect-error - cloneElement className merge
						className: cn(
							'relative inline-flex',
							(child as ReactElement<{ className?: string }>).props.className,
						),
						...interactionProps,
					},
					<>
						{AnimatePresence && MotionDiv ? (
							<AnimatePresence initial={false}>
								{activeId && activeId === id ? (
									<MotionDiv
										style={{ originY: '0px' }}
										layoutId={`background-${uniqueId}`}
										className={cn('absolute inset-0 h-full', className)}
										transition={transition}
										initial={{ opacity: defaultValue ? 1 : 0 }}
										animate={{
											opacity: 1,
										}}
										exit={{
											opacity: 0,
										}}
									/>
								) : null}
							</AnimatePresence>
						) : null}
						<span className="z-10 h-full">
							{(child as ReactElement<{ children?: ReactNode }>).props.children}
						</span>
					</>,
				)
			})}
		</span>
	)
}
