import { Grid, Section } from '@daren/ui-components'
import React from 'react'
import type { RichTextType, Template } from 'tinacms'

import { portableTextSchema } from '../../.tina/schema/objects'
import type { Block } from '../../lib/types/cms'
import { PortableText } from '../common/portable-text'

export const Content = ({
  parentField,
  body,
}: Block & {
  body?: RichTextType
}) => {
  return (
    <Section>
      <Grid
        className="prose text-primary dark:prose-invert"
        data-tinafield={`${parentField}.body`}
      >
        {body && <PortableText content={body} />}
      </Grid>
    </Section>
  )
}

export const contentBlockSchema: Template = {
  name: 'content',
  label: 'Content',
  ui: {
    previewSrc: '/blocks/content.png',
    defaultItem: {
      body: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.',
    },
  },
  fields: [
    {
      ...portableTextSchema,
      label: 'Body',
      name: 'body',
    },
  ],
}
