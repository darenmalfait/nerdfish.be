import { Grid } from '@daren/ui-components'
import * as React from 'react'

import { Gallery, GalleryType } from '~/components/elements'
import { Container, Section } from '~/components/layout'

import type { SanityBlock, SanityImage } from '~/types/sanity'

interface GalleryBlockProps {
  images?: SanityImage[]
  display?: string
  zoom?: boolean
}

function GalleryBlock({
  content: { display, images, zoom } = {},
}: SanityBlock<GalleryBlockProps>) {
  let Component

  switch (display) {
    case GalleryType.Grid:
      Component = Gallery.Grid
      break
    case GalleryType.Wicked:
      Component = Gallery.Wicked
      break
    default:
      Component = Gallery.Grid
  }

  return (
    <Section>
      <Grid>
        <Container className="py-24 mb-14" size="full">
          <Component images={images as SanityImage[]} zoom={zoom as boolean} />
        </Container>
      </Grid>
    </Section>
  )
}

export { GalleryBlock }
