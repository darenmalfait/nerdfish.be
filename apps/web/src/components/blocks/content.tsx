import * as React from 'react'
import {Grid, Section} from '@nerdfish/ui'
import {type RichTextType} from 'tinacms'
import {tinaField} from 'tinacms/dist/react'

import {Block} from '~/lib/types/cms'

import {PortableText} from '../portable-text'

export const Content = (
  data: Block & {
    body?: RichTextType
  },
) => {
  const {body} = data

  return (
    <Section>
      <Grid
        className="prose py-12 text-primary dark:prose-invert"
        data-tina-field={tinaField(data, 'body')}
      >
        {body ? <PortableText content={body} /> : null}
      </Grid>
    </Section>
  )
}
