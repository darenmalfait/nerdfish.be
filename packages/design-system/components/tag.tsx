'use client'

import { cx } from '@nerdfish/utils'
import { CustomCheckboxContainer, CustomCheckboxInput } from '@reach/checkbox'
import { type ChangeEventHandler } from 'react'
//TODO: remove reach, use our own checkbox

function Tag({
	tag,
	selected,
	onClick,
	className,
	disabled,
	size = 'md',
}: {
	tag: string
	selected?: boolean
	onClick?: ChangeEventHandler<HTMLInputElement>
	disabled?: boolean
	className?: string
	size?: 'sm' | 'md'
}) {
	return (
		<CustomCheckboxContainer
			as="label"
			checked={selected}
			onChange={onClick}
			className={cx(
				'focus-outline relative mb-4 mr-4 block h-auto w-auto cursor-pointer rounded-full transition after:rounded-full',
				{
					'bg-muted text-primary': !selected,
					'bg-inverted text-inverted': selected,
					'hover:focus-ring opacity-100': !disabled,
					'bg-muted/30 text-muted cursor-default': disabled,
					'px-6 py-3': size === 'md',
					'px-4 py-2 text-sm': size === 'sm',
				},
				className,
			)}
			disabled={disabled}
		>
			<CustomCheckboxInput checked={selected} value={tag} className="sr-only" />
			<span>{tag}</span>
		</CustomCheckboxContainer>
	)
}

export { Tag }
