import type { ObjectField } from '../../types/schema-types'

export const background: ObjectField = {
  title: 'Background',
  name: 'background',
  type: 'object',
  initialValue: {
    backgroundType: 'static',
  },
  fields: [
    {
      title: 'Background type',
      name: 'backgroundType',
      type: 'string',
      options: {
        list: [
          { title: 'Static colour', value: 'static' },
          { title: 'Image', value: 'backgroundImage' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
    },
    {
      title: 'Static Colour',
      name: 'static',
      type: 'staticBackground',
      hidden: ({ parent }: any): boolean => {
        return !(!parent || parent.backgroundType === 'static')
      },
    },
    {
      title: 'Background image',
      name: 'imageBackground',
      type: 'imageBackground',
      hidden: ({ parent }: any): boolean => {
        return !(parent.backgroundType === 'backgroundImage')
      },
    },
  ],
}
