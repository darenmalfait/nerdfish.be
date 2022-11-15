import { H3 } from '@daren/ui-components'
import clsx from 'clsx'

import { DateFormatter } from './date-formatter'
import { Image } from './image'
import { Link } from './link'

import type { Blog } from '../../.tina/__generated__/types'
import { useGlobal } from '../../context/global-provider'
import {
  buildSrc,
  buildSrcSet,
  getLowQualityUrlFor,
} from '../../lib/utils/cloudinary'
import { getDatedSlug } from '../../lib/utils/routes'
import {
  CategoryIndicator,
  getCategoryColors,
} from '../common/category-indicator'

function ArticleCard({
  title,
  heroImg,
  date = '',
  category,
  _sys,
}: Partial<Blog>) {
  const { hydrated } = useGlobal()
  return (
    <div className="relative w-full">
      <Link
        href={
          hydrated ? `/blog${getDatedSlug(date, _sys?.filename || '')}` : ''
        }
        className="group peer block relative w-full focus:outline-none"
      >
        <CategoryIndicator category={category} />

        {heroImg ? (
          <div className="rounded-lg aspect-w-3 aspect-h-4">
            <Image
              className={clsx(
                'object-cover absolute inset-0 w-full h-full rounded-lg focus-ring',
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
          <div className="aspect-w-3 aspect-h-4">
            <div className="w-full rounded-lg transition focus-ring">
              <div className="inset-0 bg-orange-500" />
            </div>
          </div>
        )}

        <div className="mt-8 text-xl font-bold text-primary-300">
          <DateFormatter dateString={date} format="PPP" />
        </div>
        <H3 as="div" className="mt-4">
          {title}
        </H3>
      </Link>
    </div>
  )
}

export { ArticleCard }
