import {cx} from '@nerdfish/utils'
import {ArrowRight} from 'lucide-react'

type ArrowIconProps = {
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

function ArrowIcon({
  direction = 'right',
  size,
  className,
  ...props
}: JSX.IntrinsicElements['svg'] & ArrowIconProps) {
  return (
    <ArrowRight
      width={size}
      height={size}
      className={cx(rotationMap[direction], className)}
      {...props}
    />
  )
}

export {ArrowIcon}
export type {ArrowIconProps}
