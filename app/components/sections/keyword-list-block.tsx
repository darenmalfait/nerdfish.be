import { Grid, H1 } from '@daren/ui-components'
import * as React from 'react'

import { Container, Section } from '~/components/layout'
import type { SanityBlock } from '~/types/sanity'

interface ContentProps {
  title?: string
  items?: string[]
}

export function KeywordlistBlock({
  content: { title, items = [] } = {},
}: SanityBlock<ContentProps>) {
  return (
    <Section>
      <Grid>
        <Container size="full" className="py-32">
          <div className="flex flex-col space-y-8 lg:flex-row lg:justify-between lg:space-y-0 lg:space-x-16">
            <H1 as="h2" className="w-full max-w-sm font-bold xl:max-w-lg">
              {title}
            </H1>
            <div className="grid grid-cols-2 gap-8 w-full md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
              {items.map(item => (
                <span key={item} className="block text-lg text-primary">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </Container>
      </Grid>
    </Section>
  )
}
