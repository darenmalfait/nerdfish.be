import { Grid } from '@daren/ui-components'
import * as React from 'react'

import { Container, Section } from '~/components/layout-components'
import { SanityBlock } from '~/types/sanity'

interface ContentProps {
  title?: string
}

export function <%= blockName %>({
  content: { title } = {},
}: SanityBlock<ContentProps>) {
  return (
    <Section>
      <Grid>
        <Container>{title && title}</Container>
      </Grid>
    </Section>
  )
}

