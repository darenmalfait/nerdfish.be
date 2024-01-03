'use client'

import * as React from 'react'
import {ElementState, useElementState} from '@nerdfish-website/lib/utils'
import {type ArrowIconProps} from '@nerdfish-website/ui/components/arrow-icon'
import {Icons} from '@nerdfish-website/ui/icons'
import {cx} from '@nerdfish/utils'
import {motion, Variant} from 'framer-motion'

import {Link} from './link'

const arrowVariants: Record<
  ArrowIconProps['direction'],
  Record<ElementState, Variant>
> = {
  up: {
    initial: {y: 0},
    hover: {y: -8},
    focus: {
      y: [0, -8, 0],
      transition: {repeat: Infinity},
    },
    active: {y: -24},
  },
  right: {
    initial: {x: 0},
    hover: {x: 8},
    focus: {
      x: [0, 8, 0],
      transition: {repeat: Infinity},
    },
    active: {x: 24},
  },
  down: {
    initial: {y: 0},
    hover: {y: 8},
    focus: {
      y: [0, 8, 0],
      transition: {repeat: Infinity},
    },
    active: {y: 24},
  },
  left: {
    initial: {x: 0},
    hover: {x: -8},
    focus: {
      x: [0, -8, 0],
      transition: {repeat: Infinity},
    },
    active: {x: -24},
  },
}

interface ArrowLinkProps {
  className?: string
  direction?: ArrowIconProps['direction']
  href?: string
  children: React.ReactNode
  as?: string
}

const MotionLink = motion(Link)
const MotionSpan = motion.span

function ArrowLink({
  children,
  direction = 'right',
  className,
  href,
  ...props
}: ArrowLinkProps) {
  const [ref, state] = useElementState()

  const Tag = href ? MotionLink : MotionSpan

  return (
    <Tag
      {...props}
      href={href ?? '#'}
      className={cx(
        className,
        'inline-flex cursor-pointer items-center space-x-4 text-left text-lg font-bold !no-underline transition text-primary focus:outline-none',
      )}
      ref={ref as any}
      animate={state}
    >
      {children && (direction === 'right' || direction === 'up') ? (
        <span className="mr-8 text-xl font-bold">{children}</span>
      ) : null}

      <div className="relative inline-flex h-14 w-14 flex-none items-center justify-center p-1">
        <motion.span variants={arrowVariants[direction]}>
          <Icons.Arrow size={20} direction={direction} />
        </motion.span>
      </div>

      {children && (direction === 'left' || direction === 'down') ? (
        <span className="ml-8 text-xl font-bold">{children}</span>
      ) : null}
    </Tag>
  )
}

function BackLink({
  href,
  className,
  children,
}: {href: string} & Pick<ArrowLinkProps, 'className' | 'children'>) {
  const [ref, state] = useElementState()

  const Tag = href ? MotionLink : MotionSpan

  return (
    <Tag
      href={href}
      className={cx(
        className,
        'flex space-x-4 font-bold text-primary focus:outline-none',
      )}
      ref={ref as any}
      animate={state}
    >
      <motion.span variants={arrowVariants.left}>
        <Icons.Arrow size={20} direction="left" />
      </motion.span>
      <span>{children}</span>
    </Tag>
  )
}

export {ArrowLink, BackLink}
