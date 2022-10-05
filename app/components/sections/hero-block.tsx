import type { SerializeFrom } from '@remix-run/node'
import type { PortableTextEntry } from '@sanity/block-content-to-react'
import * as React from 'react'

import { PortableText } from '~/components/common'
import { Section, Hero, BackgroundContainer } from '~/components/layout'
import type { SanityBlock, SanityImage } from '~/types/sanity'

interface HeroBlockProps {
  title?: string
  image?: SerializeFrom<SanityImage>
  text?: PortableTextEntry[]
}

function HeroBlock({
  content: { title, image, text } = {},
  layout = {},
}: SanityBlock<HeroBlockProps>) {
  return (
    <BackgroundContainer layout={layout}>
      <Section>
        <Hero
          subTitle={text && <PortableText blocks={text} />}
          title={title}
          image={image}
        />
      </Section>
    </BackgroundContainer>
  )
}

export { HeroBlock }
