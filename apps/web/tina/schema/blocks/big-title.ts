import {type Template} from 'tinacms'

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
      type: 'object',
      label: 'Action',
      name: 'action',
      fields: [
        {
          name: 'label',
          label: 'Label',
          type: 'string',
        },
        {
          name: 'href',
          label: 'Href',
          type: 'string',
        },
      ],
    },
  ],
}
