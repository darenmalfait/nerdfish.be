import * as React from 'react'
import {tinaField} from 'tinacms/dist/react'

import {PortableText, type Block, type PageBlocksContent} from '~/app/cms'

export function ContentBlock(data: Block<PageBlocksContent>) {
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
