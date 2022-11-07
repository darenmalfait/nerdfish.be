import { Container, Grid, Section } from '@daren/ui-components'
import * as React from 'react'

import type { Template } from 'tinacms'

import type { Block } from '../../lib/types/cms'

const BigTitle = ({
  parentField,
  title,
}: Block & {
  title?: string
}) => {
  return (
    <Section>
      <Grid className="my-8 lg:my-16">
        <Container size="full" className="space-y-6">
          <h1
            data-tinafield={`${parentField}.title`}
            className="text-primary text-6xl font-black leading-none text-transparent uppercase sm:text-[11.6250vw] 2xl:text-[12rem]"
          >
            {title}
          </h1>
        </Container>
      </Grid>
    </Section>
  )
}

const bigTitleBlockSchema: Template = {
  name: 'bigTitle',
  label: 'Big Title',
  ui: {
    previewSrc: '/blocks/hero.png',
    defaultItem: {
      title: 'Big Title',
    },
  },
  fields: [
    {
      type: 'string',
      label: 'Title',
      name: 'title',
    },
  ],
}

export { BigTitle, bigTitleBlockSchema }
