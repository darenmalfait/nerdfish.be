import { Grid } from '@daren/ui-components'
import * as React from 'react'

import { Container, Section } from '~/components/layout'
import type { SanityBlock } from '~/types/sanity'

interface ContentProps {
  title?: string
}

export function BigtitleBlock({
  content: { title } = {},
}: SanityBlock<ContentProps>) {
  return (
    <Section>
      <Grid className="my-8 lg:my-16">
        <Container size="full">
          <h1 className="text-6xl font-black leading-none text-transparent uppercase sm:text-[11.6250vw] 2xl:text-[12rem] text-primary">
            {title}
          </h1>
        </Container>
      </Grid>
    </Section>
  )
}
