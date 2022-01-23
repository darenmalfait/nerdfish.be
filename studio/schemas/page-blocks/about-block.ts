import { BiCube } from 'react-icons/bi'

import { BlockContentType } from '../../types/block-types'
import type { ObjectField } from '../../types/schema-types'
import { blockFieldName } from '../fragments/block-type'
import { createBlockSchema } from '../helpers/create-block-schema'

const BLOCK_NAME = 'aboutBlock'
const BLOCK_TITLE = 'About'

export const aboutBlockContent: ObjectField = {
  type: 'object',
  title: 'Block Content',
  name: blockFieldName(BLOCK_NAME, BlockContentType.content),
  fields: [
    {
      title: 'Image',
      name: 'image',
      type: 'figureWithOptions',
    },
    {
      title: 'Content',
      name: 'body',
      type: 'portableText',
    },
    {
      title: 'Action',
      name: 'action',
      type: 'cta',
    },
  ],
}

export const aboutBlock: ObjectField = {
  ...createBlockSchema({
    name: BLOCK_NAME,
    title: BLOCK_TITLE,
    hasContent: true,
  }),
  icon: BiCube,
  preview: {
    select: {
      blocks: 'content.body',
      media: 'image',
    },
    prepare({ blocks, media }) {
      const block = (blocks || []).find((block: any) => block._type === 'block')

      return {
        title: block
          ? block.children
              .filter((child: any) => child._type === 'span')
              .map((span: any) => span.text)
              .join('')
          : 'No title',
        subtitle: BLOCK_TITLE,
        media,
      }
    },
  },
}
