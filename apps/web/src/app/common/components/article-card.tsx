'use client'

import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  CategoryIndicator,
  getCategoryColors,
} from '@nerdfish-website/ui/components/category-indicator'
import {DateFormatter} from '@nerdfish-website/ui/components/date-formatter'
import {H3} from '@nerdfish/ui'
import {cx} from '@nerdfish/utils'

import {type Blog, type Work} from '~/app/cms'

import {buildSrc} from '../utils'

function ArticleCard({
  title,
  heroImg,
  date = '',
  category,
  href,
  _sys,
}: Partial<Blog | Work> & {
  href: string
}) {
  return (
    <Link href={href} className="group relative w-full outline-none">
      <div className="peer relative block w-full outline-none">
        <CategoryIndicator category={category} />

        {heroImg ? (
          <div
            className={cx(
              'aspect-h-4 aspect-w-3 rounded-lg shadow-outline group-focus:ring-2 group-hover:ring-2 ring-transparent ring-offset-inverted group-focus:ring-current group-hover:ring-current ring-offset-2',
              getCategoryColors(category),
            )}
          >
            <Image
              className="absolute inset-0 size-full rounded-lg object-cover"
              src={buildSrc(heroImg, {
                width: 800,
              })}
              fill
              alt={title ?? ''}
            />
          </div>
        ) : (
          <div className="aspect-h-4 aspect-w-3">
            <div className="w-full rounded-lg transition">
              <div className="inset-0 bg-nerdfish" />
            </div>
          </div>
        )}

        <div className="space-y-2">
          {date ? (
            <div className="mt-8 text-xl font-bold text-muted">
              <DateFormatter dateString={date} format="PPP" />
            </div>
          ) : null}
          <H3 as="div">{title}</H3>
        </div>
      </div>
    </Link>
  )
}

export {ArticleCard}
