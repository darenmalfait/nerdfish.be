import { ProgressiveImage } from '@daren/ui-components'
import clsx from 'clsx'
import * as React from 'react'
import { Controlled } from 'react-medium-image-zoom'
import { useResponsiveImage } from 'remix-image'

import { useResponsiveSanityImage } from '~/lib/api/sanity'

import type { SanityImage, SanityImageAsset } from '~/types'

export type ResponsiveProps = {
  maxWidth?: number
  size: { width: number; height?: number }
}

type ImageProps = Pick<SanityImage, 'zoom' | 'shadow'> & {
  responsive?: ResponsiveProps[]
  asset?: SanityImageAsset
}

function Image({
  alt,
  className,
  blurDataUrl,
  zoom,
  shadow,
  ...imgProps
}: JSX.IntrinsicElements['img'] & {
  blurDataUrl?: string
} & ImageProps) {
  const [isZoomed, setIsZoomed] = React.useState(false)

  const handleZoomChange = React.useCallback(shouldZoom => {
    setIsZoomed(shouldZoom)
  }, [])

  return (
    <div
      className={clsx(
        'block overflow-hidden mx-auto w-full rounded-xl',
        {
          'shadow-2xl': shadow,
        },
        className,
      )}
    >
      {zoom ? (
        <Controlled
          isZoomed={isZoomed}
          onZoomChange={handleZoomChange}
          zoomMargin={40}
        >
          <ProgressiveImage
            className={className}
            placeholder={blurDataUrl || imgProps.src}
            img={<img {...imgProps} alt={alt} />}
          />
        </Controlled>
      ) : (
        <div>
          <ProgressiveImage
            className={className}
            placeholder={blurDataUrl || imgProps.src}
            img={<img {...imgProps} alt={alt} />}
          />
        </div>
      )}
    </div>
  )
}

function OptimizedSanityImage({ responsive, ...image }: ImageProps) {
  const responsiveProps = useResponsiveSanityImage(image, responsive)
  // we don't need asset here, but we need to pass it to useResponsiveImage
  const { asset, ...imgProps } = image

  return <Image {...imgProps} {...responsiveProps} />
}

function OptimizedDefaultImage({
  optimizerUrl = '/resources/image',
  responsive = [],
  ...imgProps
}: JSX.IntrinsicElements['img'] & {
  optimizerUrl?: string
  blurDataUrl?: string
} & ImageProps) {
  const responsiveProps = useResponsiveImage(imgProps, optimizerUrl, responsive)

  return <Image {...imgProps} {...responsiveProps} />
}

function OptimizedImage(
  props: JSX.IntrinsicElements['img'] & {
    optimizerUrl?: string
    blurDataUrl?: string
  } & ImageProps,
) {
  if (props.asset) {
    return <OptimizedSanityImage {...props} />
  }

  return <OptimizedDefaultImage {...props} />
}

export { OptimizedImage }
