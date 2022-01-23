import clsx from 'clsx'
import { motion, Variant } from 'framer-motion'
import * as React from 'react'

import { Link } from './link'

import { ArrowIcon, ArrowIconProps } from '~/components/icons/arrow-icon'

import { ElementState, useElementState } from '~/hooks/use-element-state'

const arrowVariants: Record<
  ArrowIconProps['direction'],
  Record<ElementState, Variant>
> = {
  up: {
    initial: { y: 0 },
    hover: { y: -8 },
    focus: {
      y: [0, -8, 0],
      transition: { repeat: Infinity },
    },
    active: { y: -24 },
  },
  right: {
    initial: { x: 0 },
    hover: { x: 8 },
    focus: {
      x: [0, 8, 0],
      transition: { repeat: Infinity },
    },
    active: { x: 24 },
  },
  down: {
    initial: { y: 0 },
    hover: { y: 8 },
    focus: {
      y: [0, 8, 0],
      transition: { repeat: Infinity },
    },
    active: { y: 24 },
  },
  left: {
    initial: { x: 0 },
    hover: { x: -8 },
    focus: {
      x: [0, -8, 0],
      transition: { repeat: Infinity },
    },
    active: { x: -24 },
  },
}

interface ArrowLinkProps {
  className?: string
  direction?: ArrowIconProps['direction']
  href?: string
  children: React.ReactNode
}

const MotionLink = motion(Link)

function ArrowLink({
  children,
  direction = 'right',
  className,
  ...props
}: ArrowLinkProps) {
  const [ref, state] = useElementState()

  return (
    <MotionLink
      {...props}
      className={clsx(
        className,
        'inline-flex items-center space-x-4 text-lg font-bold text-left !no-underline focus:outline-none transition cursor-pointer text-primary',
      )}
      ref={ref}
      animate={state}
    >
      {children && (direction === 'right' || direction === 'up') ? (
        <span className="mr-8 text-xl font-bold">{children}</span>
      ) : null}

      <div className="inline-flex relative flex-none justify-center items-center p-1 w-14 h-14">
        <motion.span variants={arrowVariants[direction]}>
          <ArrowIcon size={20} direction={direction} />
        </motion.span>
      </div>

      {children && (direction === 'left' || direction === 'down') ? (
        <span className="ml-8 text-xl font-bold">{children}</span>
      ) : null}
    </MotionLink>
  )
}

function BackLink({
  href,
  className,
  children,
}: { href: string } & Pick<ArrowLinkProps, 'className' | 'children'>) {
  const [ref, state] = useElementState()

  return (
    <MotionLink
      href={href}
      className={clsx(
        className,
        'flex space-x-4 font-bold focus:outline-none text-primary',
      )}
      ref={ref}
      animate={state}
    >
      <motion.span variants={arrowVariants.left}>
        <ArrowIcon size={20} direction="left" />
      </motion.span>
      <span>{children}</span>
    </MotionLink>
  )
}

export { ArrowLink, BackLink }
