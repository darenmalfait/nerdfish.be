import {H3} from '@daren/ui-components'
import clsx from 'clsx'

import type {Blog} from '../../.tina/__generated__/types'
import {useGlobal} from '../../context/global-provider'
import {
  buildSrc,
  buildSrcSet,
  getLowQualityUrlFor,
} from '../../lib/utils/cloudinary'
import {getDatedSlug} from '../../lib/utils/routes'
import {
  CategoryIndicator,
  getCategoryColors,
} from '../common/category-indicator'
import {DateFormatter} from './date-formatter'
import {Image} from './image'
import {Link} from './link'

function ArticleCard({
  title,
  heroImg,
  date = '',
  category,
  _sys,
}: Partial<Blog>) {
  const {hydrated} = useGlobal()
  return (
    <div className="relative w-full">
      <Link
        href={
          hydrated ? `/blog${getDatedSlug(date, _sys?.filename ?? '')}` : ''
        }
        className="group peer relative block w-full focus:outline-none"
      >
        <CategoryIndicator category={category} />

        {heroImg ? (
          <div className="aspect-w-3 aspect-h-4 rounded-lg shadow-outline">
            <Image
              className={clsx(
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
          <div className="aspect-w-3 aspect-h-4">
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
      </Link>
    </div>
  )
}

export {ArticleCard}
