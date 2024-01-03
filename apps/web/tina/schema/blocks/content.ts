import {type Template} from 'tinacms'

import {portableTextSchema} from '../objects'

export const contentBlockSchema: Template = {
  name: 'content',
  label: 'Content',
  ui: {
    previewSrc: '/blocks/content.png',
    defaultItem: {
      body: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.',
    },
  },
  fields: [
    {
      ...portableTextSchema,
      label: 'Body',
      name: 'body',
    },
  ],
}
