'use client'

import * as React from 'react'
import {ClientOnly} from '@nerdfish-website/ui/components/client-only'
import {ProgressiveImage, Skeleton} from '@nerdfish/ui'
import {cx, type ExtractProps} from '@nerdfish/utils'

export function Image({
  src,
  className,
  placeholder,
  alt,
  style,
  loading = 'lazy',
  ...props
}: React.ComponentPropsWithoutRef<'img'> & {
  placeholder: ExtractProps<typeof ProgressiveImage>['placeholder']
}) {
  if (!src) return null

  const imageClassName = cx('rounded-lg w-full object-cover', className)

  return (
    <div className="w-full rounded-lg" suppressHydrationWarning>
      <ClientOnly
        fallback={
          placeholder ? (
            <img alt={alt ?? ''} src={placeholder} className={imageClassName} />
          ) : (
            <Skeleton className={imageClassName} />
          )
        }
      >
        <ProgressiveImage
          className={imageClassName}
          placeholder={placeholder}
          img={<img {...props} loading={loading} alt={alt} src={src} />}
        />
      </ClientOnly>
    </div>
  )
}
