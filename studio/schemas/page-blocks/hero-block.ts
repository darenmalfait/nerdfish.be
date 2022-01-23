import { BiHeading } from 'react-icons/bi'

import { BlockContentType, ObjectField } from '../../types/schema-types'
import { background } from '../fragments/background'
import { blockFieldName } from '../fragments/block-type'
import { createBlockSchema } from '../helpers/create-block-schema'

const BLOCK_NAME = 'heroBlock'
const BLOCK_TITLE = 'Hero'

export const heroBlockContent: ObjectField = {
  type: 'object',
  title: 'Block Content',
  name: blockFieldName(BLOCK_NAME, BlockContentType.content),
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
    },
    {
      title: 'Text',
      name: 'text',
      type: 'portableText',
    },
    {
      name: 'image',
      type: 'figure',
    },
  ],
}

export const heroBlockLayout: ObjectField = {
  type: 'object',
  title: 'Block Layout',
  name: blockFieldName(BLOCK_NAME, BlockContentType.layout),
  fields: [background],
}

export const heroBlock: ObjectField = {
  ...createBlockSchema({
    name: BLOCK_NAME,
    title: BLOCK_TITLE,
    hasContent: true,
    hasLayout: true,
  }),
  icon: BiHeading,
}
