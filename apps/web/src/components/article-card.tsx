'use client'

import * as React from 'react'
import Link from 'next/link'
import {
  CategoryIndicator,
  getCategoryColors,
} from '@nerdfish-website/ui/components/category-indicator'
import {DateFormatter} from '@nerdfish-website/ui/components/date-formatter'
import {Image} from '@nerdfish-website/ui/components/image'
import {H3} from '@nerdfish/ui'
import {cx} from '@nerdfish/utils'

import {
  buildSrc,
  buildSrcSet,
  getLowQualityUrlFor,
} from '~/lib/utils/cloudinary'
import {getDatedSlug} from '~/lib/utils/routes'
import {type Blog} from '~/tina/__generated__/types'

function ArticleCard({
  title,
  heroImg,
  date = '',
  category,
  _sys,
}: Partial<Blog>) {
  return (
    <Link
      href={`/blog${getDatedSlug(date, _sys?.filename ?? '')}`}
      className="relative w-full"
    >
      <div className="group peer relative block w-full focus:outline-none">
        <CategoryIndicator category={category} />

        {heroImg ? (
          <div className="aspect-h-4 aspect-w-3 rounded-lg shadow-outline">
            <Image
              className={cx(
                'absolute inset-0 h-full w-full rounded-lg object-cover focus-ring',
                getCategoryColors(category),
              )}
              placeholder={getLowQualityUrlFor(heroImg)}
              srcSet={buildSrcSet(heroImg)}
              src={buildSrc(heroImg, {
                width: 600,
              })}
              alt={title ?? ''}
            />
          </div>
        ) : (
          <div className="aspect-h-4 aspect-w-3">
            <div className="w-full rounded-lg transition focus-ring">
              <div className="inset-0 bg-orange-500" />
            </div>
          </div>
        )}

        <div className="space-y-2">
          <div className="mt-8 text-xl font-bold text-primary-300">
            <DateFormatter dateString={date} format="PPP" />
          </div>
          <H3 as="div">{title}</H3>
        </div>
      </div>
    </Link>
  )
}

export {ArticleCard}
