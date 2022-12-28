import {Container, Grid, H2} from '@daren/ui-components'
import clsx from 'clsx'
import * as React from 'react'

import {
  CategoryIndicator,
  getCategoryColors,
} from '../../components/common/category-indicator'

import {
  buildSrc,
  buildSrcSet,
  getLowQualityUrlFor,
} from '../../lib/utils/cloudinary'

import {ArrowLink} from './arrow-link'
import {Image} from './image'
import {Link} from './link'

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
            'block rounded-lg no-underline lg:bg-transparent',
            className,
          )}
          href={href}
          {...props}
        >
          <Grid
            nested
            className="shadow-outline group w-full rounded-lg px-8 pt-14 pb-6 bg-secondary md:pb-12 lg:px-0"
          >
            <div className="col-span-full lg:col-span-5 lg:col-start-2 lg:flex lg:flex-col lg:justify-between">
              <div suppressHydrationWarning>
                {category ? (
                  <CategoryIndicator
                    className="bg-grey-900 mb-8 text-white dark:bg-gray-50 dark:text-gray-900"
                    category={category}
                    inline
                  />
                ) : null}
                <H2 as="h3" className="mt-12 font-bold">
                  {title}
                </H2>
                <div className="mt-6 text-xl font-bold text-primary">
                  {subTitle}
                </div>
              </div>

              {href ? (
                <div className="mt-12 flex items-center justify-between">
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
              ) : null}
            </div>
            <div className="aspect-w-3 aspect-h-4 relative col-span-full mt-12 h-0 lg:col-span-4 lg:col-start-8 lg:mt-0">
              {image ? (
                <Image
                  className="absolute inset-0 object-cover"
                  placeholder={getLowQualityUrlFor(image)}
                  srcSet={buildSrcSet(image)}
                  src={buildSrc(image, {
                    width: 600,
                  })}
                  alt={title ?? ''}
                />
              ) : null}
            </div>
          </Grid>
        </Link>
      </Container>
    </Grid>
  )
}

export {HighlightCard}
