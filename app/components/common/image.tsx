import * as React from 'react'
import {ExtractProps, ProgressiveImage, cx} from '@daren/ui-components'

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
    <div className="w-full rounded-lg">
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
