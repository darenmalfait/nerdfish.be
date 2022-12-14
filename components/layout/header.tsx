import {Grid, H2} from '@daren/ui-components'
import clsx from 'clsx'

import {ArrowLink} from '../common/arrow-link'

interface HeaderProps {
  ctaUrl?: string
  cta?: string
  as?: React.ElementType
  title?: string
  subTitle?: React.ReactNode
  className?: string
}

function Header({ctaUrl, cta, title, subTitle, className, as}: HeaderProps) {
  return (
    <Grid as={as}>
      <div
        className={clsx(
          'col-span-full flex flex-col space-y-10 lg:flex-row lg:items-end lg:justify-between lg:space-y-0',
          className,
        )}
      >
        <div className="space-y-2 lg:space-y-0">
          {title ? <H2 className="font-bold">{title}</H2> : null}
          {subTitle ? (
            <H2
              variant="secondary"
              as="p"
              className="font-bold !text-gray-600 dark:!text-gray-300"
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
