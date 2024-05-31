import * as React from 'react'
import {tinaField} from 'tinacms/dist/react'

import {PortableText, type Block, type PageBlocksContent} from '~/app/cms'

export function ContentBlock(data: Block<PageBlocksContent>) {
  const {body} = data

  return (
    <section
      className="container mx-auto mb-12 px-4 py-12 text-primary"
      data-tina-field={tinaField(data, 'body')}
    >
      <div className="prose mx-auto dark:prose-invert">
        {body ? <PortableText content={body} /> : null}
      </div>
    </section>
  )
}
