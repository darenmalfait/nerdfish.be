import * as React from 'react'
import {type RichTextType} from 'tinacms'
import {tinaField} from 'tinacms/dist/react'

import {PortableText, type Block} from '~/app/cms'

export function ContentBlock(
  data: Block & {
    body?: RichTextType
  },
) {
  const {body} = data

  return (
    <section
      className="prose container mx-auto px-4 py-12 text-primary dark:prose-invert"
      data-tina-field={tinaField(data, 'body')}
    >
      {body ? <PortableText content={body} /> : null}
    </section>
  )
}
