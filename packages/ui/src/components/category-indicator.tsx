import * as React from 'react'
import {cx} from '@nerdfish/utils'

const colorMap: Record<string, string> = {
  unknown: 'set-color-blog-current-unknown',
  wiki: 'set-color-blog-current-wiki',
  technical: 'set-color-blog-current-technical',
  coaching: 'set-color-blog-current-coaching',
  project: 'set-color-blog-current-project',
  blog: 'set-color-blog-current-blog',
}

function getCategoryColors(category: string = 'unkown'): string {
  return colorMap[category] ?? ''
}

interface CategoryIndicatorProps {
  category?: string
  inline?: boolean
  className?: string
}

function CategoryIndicator({
  category = 'unknown',
  inline,
  className,
}: CategoryIndicatorProps) {
  return (
    <div
      className={cx({
        'absolute inset-0 flex h-full w-full items-start justify-start':
          !inline,
      })}
    >
      <span
        className={cx(
          'z-10 inline-block w-auto rounded-xl py-2 px-4 text-sm font-bold shadow-sm transition-colors bg-secondary text-secondary',
          // getCategoryColors(category || ''),
          {
            'absolute top-6 right-6 lg:right-[unset] lg:left-6': !inline,
          },
          className,
        )}
      >
        {category}
      </span>
    </div>
  )
}

export {CategoryIndicator, getCategoryColors}
