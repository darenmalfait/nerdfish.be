import * as React from 'react'
import {cx} from '@nerdfish/utils'

const colorMap: Record<string, string> = {
  // Blog
  unknown: 'text-blog-unknown group-hover:ring-current',
  wiki: 'text-blog-wiki group-hover:ring-current',
  technical: 'text-blog-technical group-hover:ring-current',
  coaching: 'text-blog-coaching group-hover:ring-current',
  project: 'text-blog-project group-hover:ring-current',
  blog: 'text-blog group-hover:ring-current',

  // Work
  webdesign: 'text-work-webdesign group-hover:ring-current',
  branding: 'text-work-branding group-hover:ring-current',
  print: 'text-work-print group-hover:ring-current',
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
          getCategoryColors(category),
          'z-10 inline-block ring-2 ring-current w-auto rounded-xl py-2 px-4 text-sm font-bold shadow-sm transition-colors bg-muted',
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
