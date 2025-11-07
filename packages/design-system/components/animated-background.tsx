'use client'

import { useControllableState } from '@nerdfish/react/hooks/use-controllable-state'
import { cx } from '@repo/lib/utils/base'
import { AnimatePresence, type Transition, motion } from 'motion/react'
import { Children, cloneElement, useId, type ReactElement } from 'react'

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

	const uniqueId = useId()

	function handleSetActiveId(id: string | null) {
		setActiveId(id)
		onValueChange?.(id)
	}

	if (!children) return null

	return Children.map(children, (child: ReactElement, index) => {
		const id = (child as any).props['data-id']

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
				// @ts-expect-error - TODO: why is this erroring?
				className: cx('relative inline-flex', (child as any).props.className),
				...interactionProps,
			},
			<>
				<AnimatePresence initial={false}>
					{activeId && activeId === id ? (
						<motion.div
							style={{ originY: '0px' }}
							layoutId={`background-${uniqueId}`}
							className={cx('absolute inset-0 h-full', className)}
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
				<span className="z-10 h-full">{(child as any).props.children}</span>
			</>,
		)
	})
}
