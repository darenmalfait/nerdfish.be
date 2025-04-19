'use client'

import { cx } from '@repo/lib/utils/base'
import {
	AnimatePresence,
	type SpringOptions,
	type Transition,
	type Variant,
	motion,
	useMotionValue,
	useSpring,
} from 'motion/react'
import * as React from 'react'
import { ClientOnly } from './client-only'

export interface CursorComponentProps {
	children: React.ReactNode
	className?: string
	springConfig?: SpringOptions
	attachToParent?: boolean
	transition?: Transition
	variants?: {
		initial: Variant
		animate: Variant
		exit: Variant
	}
	onPositionChange?: (x: number, y: number) => void
}

export function CursorComponent({
	children,
	className,
	springConfig,
	attachToParent,
	variants,
	transition,
	onPositionChange,
}: CursorComponentProps) {
	const cursorX = useMotionValue(
		typeof window !== 'undefined' ? window.innerWidth / 2 : 0,
	)
	const cursorY = useMotionValue(
		typeof window !== 'undefined' ? window.innerHeight / 2 : 0,
	)
	const cursorRef = React.useRef<HTMLDivElement>(null)
	const [isVisible, setIsVisible] = React.useState(!attachToParent)

	React.useEffect(() => {
		if (attachToParent) {
			document.body.style.cursor = 'auto'
		} else {
			document.body.style.cursor = 'none'
		}

		const updatePosition = (e: MouseEvent) => {
			cursorX.set(e.clientX)
			cursorY.set(e.clientY)
			onPositionChange?.(e.clientX, e.clientY)
		}

		document.addEventListener('mousemove', updatePosition)

		return () => {
			document.removeEventListener('mousemove', updatePosition)
		}
	}, [attachToParent, cursorX, cursorY, onPositionChange])

	const cursorXSpring = useSpring(cursorX, springConfig ?? { duration: 0 })
	const cursorYSpring = useSpring(cursorY, springConfig ?? { duration: 0 })

	React.useEffect(() => {
		const parent = cursorRef.current?.parentElement

		function handleMouseEnter() {
			if (!parent) return
			parent.style.cursor = 'none'
			setIsVisible(true)
		}

		function handleMouseLeave() {
			if (!parent) return
			parent.style.cursor = 'auto'
			setIsVisible(false)
		}

		if (attachToParent && parent) {
			parent.addEventListener('mouseenter', handleMouseEnter)
			parent.addEventListener('mouseleave', handleMouseLeave)
		}

		return () => {
			if (attachToParent && parent) {
				parent.removeEventListener('mouseenter', handleMouseEnter)
				parent.removeEventListener('mouseleave', handleMouseLeave)
			}
		}
	}, [attachToParent])

	return (
		<motion.div
			ref={cursorRef}
			className={cx('pointer-events-none fixed left-0 top-0 z-50', className)}
			style={{
				x: cursorXSpring,
				y: cursorYSpring,
			}}
		>
			<AnimatePresence>
				{isVisible ? (
					<motion.div
						className={className}
						whileTap={{ scale: 1.2 }}
						initial="initial"
						animate="animate"
						exit="exit"
						variants={variants}
						transition={transition}
					>
						{children}
					</motion.div>
				) : null}
			</AnimatePresence>
		</motion.div>
	)
}

export function Cursor({ children, ...props }: CursorComponentProps) {
	return (
		<ClientOnly>
			<CursorComponent {...props}>{children}</CursorComponent>
		</ClientOnly>
	)
}
