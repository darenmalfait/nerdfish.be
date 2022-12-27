import type {SchemaField} from 'tinacms'

const imageSchema: SchemaField = {
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
