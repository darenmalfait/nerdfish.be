import { ProgressiveImage } from '@daren/ui-components'
import clsx from 'clsx'
import NextImage, { ImageProps } from 'next/image'
import * as React from 'react'

function Image({
  src,
  className,
  blurDataURL,
  ...props
}: Omit<ImageProps, 'width' | 'height'> & { src: string }) {
  const [isLoaded, setIsLoaded] = React.useState(false)

  return (
    <div className="w-full rounded-lg">
      <ProgressiveImage
        className={clsx(className, 'w-full rounded-lg')}
        placeholder={blurDataURL}
        isLoaded={isLoaded}
        img={
          <NextImage
            {...props}
            onLoadingComplete={() => setIsLoaded(true)}
            className={clsx(className, 'rounded-lg')}
            src={src}
            fill
          />
        }
      />
    </div>
  )
}

export { Image }
