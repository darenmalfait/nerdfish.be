import { CgCarousel } from 'react-icons/cg'

import { blockFieldName } from '../../schemas/fragments/block-type'
import { BlockContentType, ObjectField } from '../../types/schema-types'
import { createBlockSchema } from '../helpers/create-block-schema'

const BLOCK_NAME = 'carouselBlock'
const BLOCK_TITLE = 'Carousel'

export const carouselItem: ObjectField = {
  name: 'carouselItem',
  title: 'Carousel Item',
  type: 'object',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      title: 'Body',
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

export const carouselBlockContent: ObjectField = {
  type: 'object',
  title: 'Block Content',
  name: blockFieldName(BLOCK_NAME, BlockContentType.content),
  fields: [
    {
      title: 'Items',
      name: 'items',
      type: 'array',
      of: [{ type: 'carouselItem' }],
    },
  ],
}

export const carouselBlock: ObjectField = {
  ...createBlockSchema({
    name: BLOCK_NAME,
    title: BLOCK_TITLE,
    hasContent: true,
  }),
  icon: CgCarousel,
  preview: {
    select: {
      items: 'content.items',
    },
    prepare({ items }) {
      return {
        title: `${items.length} item(s)`,
        subtitle: BLOCK_TITLE,
        media: CgCarousel,
      }
    },
  },
}
