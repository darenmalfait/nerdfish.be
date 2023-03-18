import {type ObjectField} from '../types'

const imageSchema: ObjectField = {
  type: 'object',
  label: 'Image',
  name: 'image',
  fields: [
    {
      name: 'src',
      label: 'Image Source',
      type: 'image',
    },
    {
      name: 'alt',
      label: 'Alt Text',
      type: 'string',
    },
  ],
}

export {imageSchema}
