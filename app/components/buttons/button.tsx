import clsx from 'clsx'
import * as React from 'react'

import { Link } from './link'

export interface ButtonProps {
  children?: React.ReactNode
  variant?: 'primary' | 'secondary' | 'danger'
  size?: 'small' | 'medium' | 'large'
}

function getClassName(className?: string) {
  return clsx(
    'group inline-flex relative text-lg font-bold !no-underline focus:outline-none opacity-100 disabled:opacity-50 transition',
    className,
  )
}

function ButtonInner({
  children,
  variant = 'primary',
  size = 'medium',
}: ButtonProps) {
  return (
    <>
      <div
        className={clsx(
          'absolute inset-0 rounded-full opacity-100 disabled:opacity-50 transition focus-ring',
          {
            'border-2 group-hover:border-transparent group-focus:border-transparent bg-primary':
              variant !== 'primary',
            'bg-accent dark:bg-accent-100': variant === 'primary',
            'border-primary-200': variant === 'secondary',
            'bg-danger-100 border-danger': variant === 'danger',
          },
        )}
      />
      <div
        className={clsx(
          'flex relative justify-center items-center py-4 px-8 space-x-3 w-full h-full whitespace-nowrap',
          {
            '!text-inverse': variant === 'primary',
            '!text-primary': variant === 'secondary',
            '!text-danger': variant === 'danger',
            'py-2 px-6 space-x-3': size === 'small',
            'py-6 px-11 space-x-5': size === 'large',
          },
        )}
      >
        {children}
      </div>
    </>
  )
}

function Button({
  children,
  size,
  variant,
  className,
  ...props
}: ButtonProps & JSX.IntrinsicElements['button']) {
  return (
    <button {...props} className={getClassName(className)}>
      <ButtonInner variant={variant} size={size}>
        {children}
      </ButtonInner>
    </button>
  )
}

function LinkButton({
  className,
  underlined,
  ...buttonProps
}: { underlined?: boolean } & JSX.IntrinsicElements['button']) {
  return (
    <button
      {...buttonProps}
      className={clsx(
        className,
        underlined
          ? 'whitespace-nowrap focus:outline-none underlined'
          : 'underline',
        'inline-block text-primary',
      )}
    />
  )
}

const ButtonLink = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentPropsWithRef<typeof Link> & ButtonProps
>(function ButtonLink(
  { children, className, variant = 'primary', size, ...rest },
  ref,
) {
  return (
    <Link ref={ref} className={getClassName(className)} {...rest}>
      <ButtonInner variant={variant} size={size}>
        {children}
      </ButtonInner>
    </Link>
  )
})

export { Button, ButtonLink, LinkButton }
