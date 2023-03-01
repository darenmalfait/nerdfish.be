import React from 'react'
import {Grid, Section} from '@daren/ui-components'
import type {RichTextType} from 'tinacms'

import type {Block} from '~/lib/types/cms'

import {PortableText} from '../common/portable-text'

export const Content = ({
  parentField,
  body,
}: Block & {
  body?: RichTextType
}) => {
  return (
    <Section>
      <Grid
        className="prose py-12 text-primary dark:prose-invert"
        data-tinafield={`${parentField}.body`}
      >
        {body ? <PortableText content={body} /> : null}
      </Grid>
    </Section>
  )
}
