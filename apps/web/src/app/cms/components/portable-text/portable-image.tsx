import * as React from 'react'
import {cx} from '@nerdfish/utils'

import {buildSrc, buildSrcSet, getLowQualityUrlFor} from '~/app/common'
import {Image} from '~/app/common/components/image'

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
      className={cx({
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
