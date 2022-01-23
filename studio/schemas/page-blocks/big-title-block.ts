import { MdTitle } from 'react-icons/md'

import { BlockContentType, ObjectField } from '../../types/schema-types'
import { blockFieldName } from '../fragments/block-type'
import { createBlockSchema } from '../helpers/create-block-schema'

const BLOCK_NAME = 'bigTitleBlock'
const BLOCK_TITLE = 'Bigtitle'

export const bigTitleBlockContent: ObjectField = {
  type: 'object',
  title: 'Block Content',
  name: blockFieldName(BLOCK_NAME, BlockContentType.content),
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
    },
  ],
}

export const bigTitleBlock: ObjectField = {
  ...createBlockSchema({
    name: BLOCK_NAME,
    title: BLOCK_TITLE,
    hasContent: true,
  }),
  icon: MdTitle,
}
