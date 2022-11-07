import { CustomCheckboxContainer, CustomCheckboxInput } from '@reach/checkbox'
import clsx from 'clsx'
import type { ChangeEventHandler } from 'react'

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
      className={clsx(
        className,
        'block relative mr-4 mb-4 w-auto h-auto rounded-full transition cursor-pointer',
        {
          'bg-primary-600 dark:bg-gray-800 text-primary': !selected,
          'bg-accent dark:bg-accent-100 text-white dark:text-black': selected,
          'opacity-100 focus-ring': !disabled,
          'opacity-25': disabled,
          'py-3 px-6': size === 'md',
          'py-2 px-4 text-sm': size === 'sm',
        },
      )}
      disabled={disabled}
    >
      <CustomCheckboxInput checked={selected} value={tag} className="sr-only" />
      <span>{tag}</span>
    </CustomCheckboxContainer>
  )
}

export { Tag }
