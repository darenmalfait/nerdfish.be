import { BiCube } from 'react-icons/bi'

import { BlockContentType, ObjectField } from '../../types/schema-types'
import { background } from '../fragments/background'
import { blockFieldName } from '../fragments/block-type'
import { createBlockSchema } from '../helpers/create-block-schema'

const BLOCK_NAME = '<%= blockName %>'
const BLOCK_TITLE = '<%= blockTitle %>'

export const <%= blockName %>Content: ObjectField = {
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
  ],
}

export const <%= blockName %>Layout: ObjectField = {
  type: 'object',
  title: 'Block Layout',
  name: blockFieldName(BLOCK_NAME, BlockContentType.layout),
  fields: [background],
}

export const <%= blockName %>: ObjectField = {
  ...createBlockSchema({
    name: BLOCK_NAME,
    title: BLOCK_TITLE,
    hasContent: true,
  }),
  icon: BiCube,
}
