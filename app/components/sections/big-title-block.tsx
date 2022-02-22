import { Grid } from '@daren/ui-components'
import * as React from 'react'

import { CtaLink } from '../buttons'

import { Container, Section } from '~/components/layout'
import type { SanityBlock, SanityCta } from '~/types/sanity'

interface ContentProps {
  title?: string
  action?: SanityCta
}

export function BigtitleBlock({
  content: { title, action } = {},
}: SanityBlock<ContentProps>) {
  return (
    <Section>
      <Grid className="my-8 lg:my-16">
        <Container size="full" className="space-y-6">
          {action && <CtaLink {...action} />}
          <h1 className="text-6xl font-black leading-none text-transparent uppercase sm:text-[11.6250vw] 2xl:text-[12rem] text-primary">
            {title}
          </h1>
        </Container>
      </Grid>
    </Section>
  )
}
