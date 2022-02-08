import { Grid, H2 } from '@daren/ui-components'
import clsx from 'clsx'
import * as React from 'react'

import { OptimizedImage } from './optimized-image'

import { ArrowLink, Link } from '~/components/buttons'
import { CategoryIndicator, getCategoryColors } from '~/components/common'
import { getLowQualityUrlFor } from '~/lib/sanity'

import type { SanityImage } from '~/types/sanity'
import { getResponsiveImageSizes } from '~/utils/image'

interface HighlightCardProps {
  title?: string
  subTitle?: string
  cta?: string
  image?: SanityImage
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
    <Link
      className={clsx(
        'block no-underline rounded-lg lg:bg-transparent',
        className,
      )}
      href={href}
      {...props}
    >
      <Grid className="group px-8 pt-14 pb-6 w-full rounded-lg md:pb-12 lg:px-0 bg-secondary">
        <div className="col-span-full lg:flex lg:flex-col lg:col-span-5 lg:col-start-2 lg:justify-between">
          <div>
            {category && (
              <CategoryIndicator
                className="mb-8 bg-inverse text-inverse"
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
              <ArrowLink href={href}>
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
            <OptimizedImage
              blurDataUrl={getLowQualityUrlFor(image)}
              {...image}
              responsive={getResponsiveImageSizes('small')}
              className="object-cover absolute inset-0"
              alt={title}
            />
          )}
        </div>
      </Grid>
    </Link>
  )
}

export { HighlightCard }
