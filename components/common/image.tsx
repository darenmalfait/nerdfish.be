import * as React from 'react'
import {ExtractProps, ProgressiveImage} from '@daren/ui-components'
import clsx from 'clsx'

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
        className={clsx(className, 'w-full rounded-lg')}
        placeholder={placeholder}
        img={
          <img
            {...props}
            loading={loading}
            alt={alt}
            className={clsx(className, 'rounded-lg')}
            src={src}
          />
        }
      />
    </div>
  )
}

export {Image}
