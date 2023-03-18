import {type Template} from 'tinacms'

import {actionSchema} from '../objects'

export const bigTitleBlockSchema: Template = {
  name: 'bigTitle',
  label: 'Big Title',
  ui: {
    previewSrc: '/blocks/big-title.png',
    defaultItem: {
      title: 'Big Title',
    },
  },
  fields: [
    {
      type: 'string',
      label: 'Title',
      name: 'title',
    },
    {
      ...actionSchema,
      type: 'object',
      fields: [
        {
          name: 'title',
          label: 'Title',
          type: 'string',
        },
        ...((actionSchema.fields as any) || []),
      ],
    },
  ],
}
