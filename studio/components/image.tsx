import * as React from 'react'

import imageBuilder from './image-builder'

import type { SanityImage } from './types'

interface ImageProps {
  image?: SanityImage
  width?: number
}

function Image(props: ImageProps) {
  if (!props.image?.asset._ref) {
    return null
  }
  const src = imageBuilder
    .image(props.image)
    .width(props.width || 500)
    .url()

  if (!src) {
    return null
  }

  return <img src={src} alt="" />
}

export default Image
