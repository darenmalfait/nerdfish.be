import { Container, Grid, H2 } from '@daren/ui-components'
import clsx from 'clsx'
import * as React from 'react'

import { ArrowLink } from './arrow-link'
import { Image } from './image'
import { Link } from './link'

import {
  CategoryIndicator,
  getCategoryColors,
} from '../../components/common/category-indicator'
import { buildSrc, getLowQualityUrlFor } from '../../lib/utils/cloudinary'

interface HighlightCardProps {
  title?: string
  subTitle?: string
  cta?: string
  image?: string | null
  href: string
  className?: string
  category?: string
}

function HighlightCard({
  title,
  subTitle,
  cta = 'Read full article',
  href,
  image,
  className,
  category,
  ...props
}: HighlightCardProps) {
  return (
    <Grid>
      <Container size="full">
        <Link
          className={clsx(
            'block no-underline rounded-lg lg:bg-transparent',
            className,
          )}
          href={href}
          {...props}
        >
          <Grid
            nested
            className="group px-8 pt-14 pb-6 w-full rounded-lg md:pb-12 lg:px-0 bg-secondary"
          >
            <div className="col-span-full lg:flex lg:flex-col lg:col-span-5 lg:col-start-2 lg:justify-between">
              <div suppressHydrationWarning>
                {category && (
                  <CategoryIndicator
                    className="bg-grey-900 dark:bg-gray-50 mb-8 text-white dark:text-gray-900"
                    category={category}
                    inline
                  />
                )}
                <H2 as="h3" className="mt-12 font-bold">
                  {title}
                </H2>
                <div className="mt-6 text-xl font-bold text-primary">
                  {subTitle}
                </div>
              </div>

              {href && (
                <div className="flex justify-between items-center mt-12">
                  <ArrowLink>
                    {cta}
                    <div
                      className={clsx(
                        'absolute inset-0 z-10 rounded-lg focus-ring',
                        getCategoryColors(category ?? 'unknown'),
                      )}
                    />
                    <div className="absolute inset-0 -z-1 rounded-lg" />
                  </ArrowLink>
                </div>
              )}
            </div>
            <div className="relative col-span-full mt-12 h-0 aspect-w-3 aspect-h-4 lg:col-span-4 lg:col-start-8 lg:mt-0">
              {image && (
                <Image
                  className="object-cover absolute inset-0"
                  blurDataURL={getLowQualityUrlFor(image)}
                  src={buildSrc(image, {
                    width: 600,
                  })}
                  alt={title ?? ''}
                />
              )}
            </div>
          </Grid>
        </Link>
      </Container>
    </Grid>
  )
}

export { HighlightCard }
