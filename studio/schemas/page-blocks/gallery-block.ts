import { GrGallery } from 'react-icons/gr'

import { blockFieldName } from '../../schemas/fragments/block-type'
import { BlockContentType, ObjectField } from '../../types/schema-types'
import { createBlockSchema } from '../helpers/create-block-schema'

const BLOCK_NAME = 'galleryBlock'
const BLOCK_TITLE = 'Gallery'

export const galleryBlockContent: ObjectField = {
  type: 'object',
  title: 'Block Content',
  name: blockFieldName(BLOCK_NAME, BlockContentType.content),
  fields: [
    {
      name: 'images',
      type: 'array',
      title: 'Images',
      of: [{ type: 'figure' }],
      options: {
        layout: 'grid',
      },
    },
    {
      name: 'display',
      type: 'string',
      title: 'Display as',
      description: 'How should we display these images?',
      options: {
        list: [
          { title: 'Wicked', value: 'wicked' },
          { title: 'Grid', value: 'grid' },
        ],
        layout: 'radio', // <-- defaults to 'dropdown'
      },
    },
    {
      name: 'zoom',
      type: 'boolean',
      title: 'Zoom enabled',
      description: 'Should we enable zooming of images?',
    },
  ],
}

export const galleryBlock: ObjectField = {
  ...createBlockSchema({
    name: BLOCK_NAME,
    title: BLOCK_TITLE,
    hasContent: true,
  }),
  icon: GrGallery,
  preview: {
    select: {
      images: 'content.images',
      image: 'content.images.0',
    },
    prepare(selection) {
      const { images, image } = selection

      return {
        title: `Gallery of ${Object.keys(images).length} images`,
        subtitle: image.alt,
        media: image,
      }
    },
  },
}
