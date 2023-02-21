import {Grid, Section} from '@daren/ui-components'
import {RichTextType} from 'tinacms'

import {PortableText} from '~/components/common/portable-text'
import type {Block} from '~/lib/types/cms'

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
