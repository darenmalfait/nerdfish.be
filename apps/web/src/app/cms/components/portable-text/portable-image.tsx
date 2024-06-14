import * as React from 'react'
import Image from 'next/image'
import {cx} from '@nerdfish/utils'

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
      src={url}
      width={compact ? 400 : 800}
      height={800}
      alt={alt}
    />
  )
}

export {PortableImage}
