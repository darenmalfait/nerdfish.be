import type { ObjectField } from '../../types/schema-types'

export const imageBackground: ObjectField = {
  title: 'Background image',
  name: 'imageBackground',
  type: 'object',
  fields: [
    {
      title: 'Full background image',
      name: 'image',
      type: 'image',
      description: 'The image will fill the section',
    },
  ],
}
