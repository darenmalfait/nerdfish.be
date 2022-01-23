import { FaBookReader } from 'react-icons/fa'

import { blockFieldName } from '../../schemas/fragments/block-type'
import { BlockContentType, ObjectField } from '../../types/schema-types'
import { createBlockSchema } from '../helpers/create-block-schema'

const BLOCK_NAME = 'postsBlock'
const BLOCK_TITLE = 'Posts'

export const companiesBlockContent: ObjectField = {
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
      title: 'Subtitle',
      name: 'subTitle',
      type: 'string',
    },
    {
      title: 'Link',
      name: 'link',
      type: 'reference',
      to: [{ type: 'page' }],
    },
    {
      title: 'Is search enabled',
      name: 'searchEnabled',
      type: 'boolean',
      description: 'Enable search for this block',
    },
    {
      title: 'Is first item featured',
      name: 'featuredEnabled',
      type: 'boolean',
      description: 'The first item in the list is featered.',
    },
    {
      title: 'Tags',
      description: 'Only use companies with these tags',
      name: 'tags',
      type: 'tags',
    },
    {
      title: 'Visible items',
      description: 'Number of visible items, leave empty for all.',
      name: 'count',
      type: 'number',
    },
  ],
}

export const companiesBlock: ObjectField = {
  ...createBlockSchema({
    name: BLOCK_NAME,
    title: BLOCK_TITLE,
    hasContent: true,
  }),
  icon: FaBookReader,
}
