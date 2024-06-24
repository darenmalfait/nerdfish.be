import * as React from 'react'
import {cx} from '@nerdfish/utils'

export const BigTitle = React.forwardRef<
  HTMLHeadingElement,
  React.ComponentPropsWithRef<'h1'> & {
    as?: React.ElementType
  }
>(function BigTitle({as, className, ...props}, ref) {
  const Tag = as ?? 'h1'

  return (
    <Tag
      {...props}
      className={cx(
        'font-sans text-6xl font-black uppercase leading-none text-primary sm:text-[11.6250vw] 2xl:text-[12rem]',
        className,
      )}
      ref={ref}
    >
      {props.children}
    </Tag>
  )
})
