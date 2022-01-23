import { ProgressiveImage } from '@daren/ui-components'
import clsx from 'clsx'
import * as React from 'react'
import { Controlled as ControlledZoom } from 'react-medium-image-zoom'
import { useResponsiveImage } from 'remix-image'

import type { SanityImage } from '~/types'

export type ResponsiveProps = {
  maxWidth?: number
  size: { width: number; height?: number }
}

type ImageProps = Pick<SanityImage, 'zoom' | 'shadow'>

function OptimizedImage({
  optimizerUrl = '/resources/image',
  responsive = [],
  alt,
  className,
  blurDataUrl,
  zoom,
  shadow,
  ...imgProps
}: JSX.IntrinsicElements['img'] & {
  optimizerUrl?: string
  blurDataUrl?: string
  responsive?: ResponsiveProps[]
} & ImageProps) {
  const responsiveProps = useResponsiveImage(imgProps, optimizerUrl, responsive)
  const [isZoomed, setIsZoomed] = React.useState(false)
  const Wrapper = zoom ? ControlledZoom : 'div'

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
      <Wrapper
        isZoomed={isZoomed}
        onZoomChange={handleZoomChange}
        zoomMargin={zoom ? 40 : undefined}
      >
        <ProgressiveImage
          className={className}
          placeholder={blurDataUrl}
          img={<img {...imgProps} {...responsiveProps} alt={alt} />}
        />
      </Wrapper>
    </div>
  )
}

export { OptimizedImage }
