import { AiOutlineUnorderedList } from 'react-icons/ai'

import { BlockContentType, ObjectField } from '../../types/schema-types'
import { blockFieldName } from '../fragments/block-type'
import { createBlockSchema } from '../helpers/create-block-schema'

const BLOCK_NAME = 'keywordListBlock'
const BLOCK_TITLE = 'Keyword List'

export const keywordListBlockContent: ObjectField = {
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
      type: 'array',
      name: 'items',
      of: [{ type: 'string' }],
    },
  ],
}

export const keywordListBlock: ObjectField = {
  ...createBlockSchema({
    name: BLOCK_NAME,
    title: BLOCK_TITLE,
    hasContent: true,
  }),
  icon: AiOutlineUnorderedList,
}
