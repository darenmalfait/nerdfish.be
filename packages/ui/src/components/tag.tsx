'use client'

import * as React from 'react'
import {type ChangeEventHandler} from 'react'
import {cx} from '@nerdfish/utils'
//TODO: remove reach, use our own checkbox
import {CustomCheckboxContainer, CustomCheckboxInput} from '@reach/checkbox'

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
        'relative mr-4 mb-4 block h-auto w-auto cursor-pointer rounded-full transition',
        {
          'bg-muted text-primary': !selected,
          'bg-inverted text-inverted': selected,
          'opacity-100 focus-ring': !disabled,
          'bg-muted/30 text-muted cursor-default': disabled,
          'py-3 px-6': size === 'md',
          'py-2 px-4 text-sm': size === 'sm',
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

export {Tag}
