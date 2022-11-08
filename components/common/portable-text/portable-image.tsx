import * as React from 'react'

import { buildSrc, getLowQualityUrlFor } from '../../../lib/utils/cloudinary'
import { Image } from '../image'

function PortableImage({ alt = '', url = '' }: { alt?: string; url?: string }) {
  return (
    <Image
      blurDataURL={getLowQualityUrlFor(url)}
      src={buildSrc(url, {
        width: 800,
      })}
      alt={alt}
    />
  )
}

export { PortableImage }
