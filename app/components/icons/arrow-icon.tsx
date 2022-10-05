import { ArrowRightIcon } from '@heroicons/react/24/solid'
import clsx from 'clsx'

import * as React from 'react'

export interface ArrowIconProps {
  direction: 'up' | 'right' | 'down' | 'left'
  size?: number
  className?: string
}

const rotationMap = {
  up: '-rotate-90',
  right: 'rotate-0',
  down: 'rotate-90',
  left: '-rotate-180',
}

function ArrowIcon({ direction = 'right', size, className }: ArrowIconProps) {
  return (
    <ArrowRightIcon
      width={size}
      height={size}
      className={clsx(className, '', rotationMap[direction])}
    />
  )
}

export { ArrowIcon }
