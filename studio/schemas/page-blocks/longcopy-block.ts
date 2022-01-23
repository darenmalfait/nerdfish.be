import { GrTextAlignCenter } from 'react-icons/gr'

import { blockFieldName } from '../../schemas/fragments/block-type'
import { BlockContentType, ObjectField } from '../../types/schema-types'
import { createBlockSchema } from '../helpers/create-block-schema'

const BLOCK_NAME = 'longcopyBlock'
const BLOCK_TITLE = 'Longcopy'

export const longcopyBlockContent: ObjectField = {
  type: 'object',
  title: 'Block Content',
  name: blockFieldName(BLOCK_NAME, BlockContentType.content),
  fields: [
    {
      title: 'Content',
      name: 'content',
      type: 'portableText',
      validation: Rule => Rule.required(),
    },
  ],
}

export const longcopyBlock: ObjectField = {
  ...createBlockSchema({
    name: BLOCK_NAME,
    title: BLOCK_TITLE,
    hasContent: true,
  }),
  icon: GrTextAlignCenter,
  description: 'Content can be whatever you want.',
  preview: {
    select: {
      blocks: 'content.content',
    },
    prepare({ blocks }) {
      const block = (blocks || []).find((block: any) => block._type === 'block')

      return {
        title: block
          ? block.children
              .filter((child: any) => child._type === 'span')
              .map((span: any) => span.text)
              .join('')
          : 'No title',
        subtitle: BLOCK_TITLE,
        media: GrTextAlignCenter,
      }
    },
  },
}
