import { BiCube } from 'react-icons/bi'

import { BlockContentType, ObjectField } from '../../types/schema-types'
import { blockFieldName } from '../fragments/block-type'
import { createBlockSchema } from '../helpers/create-block-schema'

const BLOCK_NAME = 'featuresBlock'
const BLOCK_TITLE = 'Features'

export const featureBlock: ObjectField = {
  name: 'featureBlock',
  title: 'Feature',
  type: 'object',
  fields: [
    {
      title: 'Icon',
      name: 'icon',
      type: 'iconPicker',
      options: {
        providers: ['hi'],
      },
    },
    {
      title: 'Title',
      name: 'title',
      type: 'string',
    },
    {
      title: 'Description',
      name: 'description',
      type: 'text',
    },
  ],
}

export const featuresBlockContent: ObjectField = {
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
      title: 'Items',
      name: 'items',
      type: 'array',
      of: [{ type: 'featureBlock' }],
    },
  ],
}

export const featuresBlock: ObjectField = {
  ...createBlockSchema({
    name: BLOCK_NAME,
    title: BLOCK_TITLE,
    hasContent: true,
  }),
  icon: BiCube,
}
