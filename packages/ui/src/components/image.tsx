'use client'

import * as React from 'react'
import {ProgressiveImage} from '@nerdfish/ui'
import {cx, ExtractProps} from '@nerdfish/utils'

function Image({
  src,
  className,
  placeholder,
  alt,
  loading = 'lazy',
  ...props
}: JSX.IntrinsicElements['img'] & {
  placeholder: ExtractProps<typeof ProgressiveImage>['placeholder']
}) {
  return (
    <div className="w-full rounded-lg" suppressHydrationWarning>
      <ProgressiveImage
        className={cx('w-full rounded-lg', className)}
        placeholder={placeholder}
        img={
          <img
            {...props}
            loading={loading}
            alt={alt}
            className={cx('rounded-lg', className)}
            src={src}
          />
        }
      />
    </div>
  )
}

export {Image}
