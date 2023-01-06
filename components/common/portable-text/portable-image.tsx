import clsx from 'clsx'
import * as React from 'react'

import {
  buildSrc,
  buildSrcSet,
  getLowQualityUrlFor,
} from '../../../lib/utils/cloudinary'
import {Image} from '../image'

function PortableImage({
  alt = '',
  src = '',
  url = src,
  compact = false,
}: {
  alt?: string
  src?: string
  url?: string
  compact?: boolean
}) {
  return (
    <Image
      className={clsx({
        'max-w-xs': compact,
      })}
      placeholder={getLowQualityUrlFor(url)}
      srcSet={buildSrcSet(url)}
      src={buildSrc(url, {
        width: compact ? 400 : 800,
      })}
      alt={alt}
    />
  )
}

export {PortableImage}
