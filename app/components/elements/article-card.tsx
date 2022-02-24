import { H3 } from '@daren/ui-components'
import clsx from 'clsx'
import formatDate from 'date-fns/format'
import parseISO from 'date-fns/parseISO'
import * as React from 'react'
import { Link } from 'remix'

import {
  CategoryIndicator,
  getCategoryColors,
} from '../common/category-indicator'
import { OptimizedImage } from '../elements/optimized-image'

import { getLowQualityUrlFor } from '~/lib/api/sanity'
import { getBlogSlug, getRoute } from '~/lib/routes'
import { getResponsiveImageSizes } from '~/lib/utils/image'
import { PageType, LanguageCode } from '~/types/languages'
import type { SanityPost } from '~/types/sanity'

function ArticleCard({
  slug,
  title,
  image,
  publishedAt,
  readingTime,
  lang,
  category,
}: SanityPost) {
  const href = getRoute(
    PageType.blog,
    getBlogSlug(publishedAt, slug as string),
    lang as LanguageCode,
  )

  return (
    <div className="relative w-full">
      <Link
        prefetch="intent"
        to={href}
        className="group peer block relative w-full focus:outline-none"
      >
        <CategoryIndicator category={category} />

        {image ? (
          <div className="rounded-lg aspect-w-3 aspect-h-4">
            <OptimizedImage
              {...image}
              blurDataUrl={getLowQualityUrlFor(image)}
              className={clsx(
                'object-contain absolute inset-0 w-full h-full rounded-lg focus-ring',
                getCategoryColors(category),
              )}
              alt={title}
              responsive={getResponsiveImageSizes('small')}
            />
          </div>
        ) : (
          <div className="aspect-w-3 aspect-h-4">
            <div className="w-full rounded-lg transition focus-ring">
              <div className="inset-0 bg-orange-500" />
            </div>
          </div>
        )}

        <div className="mt-8 text-xl font-bold text-primary-300">
          {formatDate(parseISO(publishedAt), 'PPP')} —{' '}
          {readingTime ? `${readingTime} min read` : 'quick read'}
        </div>
        <H3 as="div" className="mt-4">
          {title}
        </H3>
      </Link>
    </div>
  )
}

export { ArticleCard }
