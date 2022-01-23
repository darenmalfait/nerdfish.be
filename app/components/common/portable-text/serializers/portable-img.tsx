import clsx from 'clsx'
import * as React from 'react'

import type { Serialized } from './serializers.types'

import { OptimizedImage } from '~/components/elements/optimized-image'
import { Container } from '~/components/layout'
import { getLowQualityUrlFor, urlFor } from '~/lib/sanity'
import type { SanityImage } from '~/types/sanity'
import { getResponsiveImageSizes } from '~/utils/image'

function PortableImg({ node }: Serialized<SanityImage>) {
  const size = node.size || 'medium'

  const responsive = getResponsiveImageSizes(size)

  return (
    <Container size={size} className="py-8 m-0 lg:py-16">
      <OptimizedImage
        {...node}
        src={urlFor(node).url()}
        blurDataUrl={getLowQualityUrlFor(node)}
        responsive={responsive}
        zoom={node.zoom}
        shadow={node.shadow}
        className={clsx({ 'focus-ring': node.zoom })}
      />
    </Container>
  )
}

export { PortableImg }
