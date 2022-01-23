import { Grid } from '@daren/ui-components'
import type { PortableTextEntry } from '@sanity/block-content-to-react'
import * as React from 'react'

import { PortableText } from '~/components/common'
import { Section } from '~/components/layout'
import type { SanityBlock } from '~/types/sanity'

interface LongcopyBlockProps {
  content?: PortableTextEntry[]
}

function LongcopyBlock({
  content: { content } = {},
}: SanityBlock<LongcopyBlockProps>) {
  return (
    <Section>
      <Grid className="prose">
        {content && <PortableText blocks={content} />}
      </Grid>
    </Section>
  )
}

export { LongcopyBlock }
