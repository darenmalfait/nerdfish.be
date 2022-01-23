import clsx from 'clsx'
import * as React from 'react'

import type { SanityPost } from '~/types'

type categoryKey = SanityPost['category']

const colorMap: Record<SanityPost['category'], string> = {
  unknown: 'set-color-blog-current-unknown',
  snippet: 'set-color-blog-current-snippet',
  technical: 'set-color-blog-current-technical',
  coaching: 'set-color-blog-current-coaching',
  project: 'set-color-blog-current-project',
  blog: 'set-color-blog-current-blog',
}

export function getCategoryColors(category: categoryKey): string {
  return colorMap[category] || ''
}

interface CategoryIndicatorProps {
  category: string
  inline?: boolean
  className?: string
}

function CategoryIndicator({
  category,
  inline,
  className,
}: CategoryIndicatorProps) {
  return (
    <div
      className={clsx({
        'flex absolute inset-0 justify-start items-start w-full h-full':
          !inline,
      })}
    >
      <span
        className={clsx(
          className,
          'inline-block z-10 py-2 px-4 w-auto text-sm font-bold rounded-xl shadow-sm transition-colors text-secondary bg-secondary',
          // getCategoryColors(category || ''),
          {
            'absolute top-6 right-6 lg:right-[unset] lg:left-6': !inline,
          },
        )}
      >
        {category}
      </span>
    </div>
  )
}

export { CategoryIndicator }
