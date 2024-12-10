'use client'

import { cx } from '@nerdfish/utils'
import { AnimatePresence, type Transition, motion } from 'framer-motion'
import * as React from 'react'
import { useControllableState } from './ui'

type AnimatedBackgroundProps = {
	children?:
		| React.ReactElement<{ 'data-id': string }>[]
		| React.ReactElement<{ 'data-id': string }>
		| any

	defaultValue?: string
	value?: string
	onValueChange?: (newActiveId: string | null) => void
	className?: string
	transition?: Transition
	enableHover?: boolean
}

export function AnimatedBackground({
	children,
	value,
	defaultValue,
	onValueChange,
	className,
	transition,
	enableHover = false,
}: AnimatedBackgroundProps) {
	const [activeId, setActiveId] = useControllableState<string | null>(
		value,
		defaultValue ?? null,
		onValueChange,
	)

	const uniqueId = React.useId()

	const handleSetActiveId = (id: string | null) => {
		setActiveId(id)

		if (onValueChange) {
			onValueChange(id)
		}
	}

	if (!children) return null

	return React.Children.map(children, (child: React.ReactElement, index) => {
		const id = child.props['data-id']

		const interactionProps = enableHover
			? {
					onMouseEnter: () => handleSetActiveId(id),
					onMouseLeave: () => handleSetActiveId(null),
				}
			: {
					onClick: () => handleSetActiveId(id),
				}

		return React.cloneElement(
			child,
			{
				key: index,
				className: cx('relative inline-flex', child.props.className),
				...interactionProps,
			},
			<>
				<AnimatePresence initial={false}>
					{activeId && activeId === id ? (
						<motion.div
							style={{ originY: '0px' }}
							layoutId={`background-${uniqueId}`}
							className={cx('absolute inset-0', className)}
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
				<span className="z-10">{child.props.children}</span>
			</>,
		)
	})
}
