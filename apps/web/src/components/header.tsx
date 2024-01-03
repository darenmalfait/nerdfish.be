import * as React from 'react'
import {Grid, H2} from '@nerdfish/ui'
import {cx} from '@nerdfish/utils'

import {ArrowLink} from './arrow-link'

interface HeaderProps {
  ctaUrl?: string
  cta?: string
  as?: React.ElementType
  title?: string
  subTitle?: React.ReactNode
  className?: string
  nested?: boolean
}

function Header({
  ctaUrl,
  cta,
  title,
  subTitle,
  className,
  as,
  nested,
}: HeaderProps) {
  return (
    <Grid nested={nested} as={as}>
      <div
        className={cx(
          'col-span-full flex flex-col space-y-10 lg:flex-row lg:items-end lg:justify-between lg:space-y-0',
          className,
        )}
      >
        <div className="space-y-0">
          {title ? <H2>{title}</H2> : null}
          {subTitle ? (
            <H2
              variant="secondary"
              as="p"
              className="!text-gray-600 dark:!text-gray-300 "
            >
              {subTitle}
            </H2>
          ) : null}
        </div>

        {cta && ctaUrl ? (
          <ArrowLink href={ctaUrl} direction="right">
            {cta}
          </ArrowLink>
        ) : null}
      </div>
    </Grid>
  )
}

export {Header}
