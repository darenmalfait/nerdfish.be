import { Container, DoubleLabelLink, Grid, Section } from '@daren/ui-components'

import * as React from 'react'

import type { Template } from 'tinacms'

import { actionSchema } from '../../.tina/schema/objects'
import { Link } from '../../components/common/link'
import type { Block } from '../../lib/types/cms'

const BigTitle = ({
  parentField,
  title,
  action,
}: Block & {
  title?: string
  action?: {
    title?: string
    label?: string
    href?: string
  }
}) => {
  return (
    <Section>
      <Grid className="my-8 lg:my-16">
        <Container size="full" className="space-y-6">
          {action && action.title && (
            <DoubleLabelLink<typeof DoubleLabelLink>
              as={Link}
              href={action.href || '/'}
              description={action.label || ''}
              data-tinafield={`${parentField}.action`}
            >
              {action.title}
            </DoubleLabelLink>
          )}
          <h1
            data-tinafield={`${parentField}.title`}
            className="font-title text-6xl font-black uppercase leading-none text-transparent text-primary sm:text-[11.6250vw] 2xl:text-[12rem]"
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
    {
      ...actionSchema,
      type: 'object',
      fields: [
        {
          name: 'title',
          label: 'Title',
          type: 'string',
        },
        ...((actionSchema.fields as any) || []),
      ],
    },
  ],
}

export { BigTitle, bigTitleBlockSchema }
