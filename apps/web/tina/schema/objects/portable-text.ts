'use client'

import {type RichTextType} from 'tinacms'

import {imageSchema} from './image'

const portableTextSchema: RichTextType = {
  label: 'Text',
  name: 'text',
  type: 'rich-text',
  templates: [
    {
      ...imageSchema,
      name: 'image',
      fields: [
        ...imageSchema.fields,
        {
          type: 'boolean',
          name: 'compact',
          label: 'Compact',
        },
      ],
    },
    {
      name: 'Button',
      label: 'Button',
      fields: [
        {
          type: 'string',
          name: 'href',
          label: 'Href',
        },
        {
          type: 'string',
          name: 'text',
          label: 'Text',
        },
        {
          type: 'string',
          name: 'variant',
          label: 'Variant',
          options: [
            {label: 'Default', value: 'default'},
            {label: 'Danger', value: 'danger'},
            {label: 'Success', value: 'success'},
            {label: 'Outline', value: 'outline'},
            {label: 'Secondary', value: 'secondary'},
            {label: 'Ghost', value: 'ghost'},
            {label: 'Link', value: 'link'},
          ],
        },
      ],
    },
    {
      name: 'ContactForm',
      label: 'Contact form',
      fields: [
        {
          type: 'string',
          name: 'heading',
          label: 'Heading',
        },
      ],
    },
  ],
}

export {portableTextSchema}
