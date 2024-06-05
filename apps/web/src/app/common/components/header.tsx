import * as React from 'react'
import {H2} from '@nerdfish/ui'
import {cx} from '@nerdfish/utils'

import {ArrowLink} from './arrow-link'

interface HeaderProps {
  ctaUrl?: string
  cta?: string
  as?: React.ElementType
  title?: string
  subtitle?: React.ReactNode
  className?: string
}

function Header({ctaUrl, cta, title, subtitle, className, as}: HeaderProps) {
  const Element = as ?? 'header'
  return (
    <Element as={as}>
      <div
        className={cx(
          'flex flex-col space-y-10 lg:flex-row lg:items-end lg:justify-between lg:space-y-0',
          className,
        )}
      >
        <div className="space-y-0">
          {title ? <H2>{title}</H2> : null}
          {subtitle ? (
            <H2 variant="secondary" as="div">
              {subtitle}
            </H2>
          ) : null}
        </div>

        {cta && ctaUrl ? (
          <ArrowLink href={ctaUrl} direction="right">
            {cta}
          </ArrowLink>
        ) : null}
      </div>
    </Element>
  )
}

export {Header}
