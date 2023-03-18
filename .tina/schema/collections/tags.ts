import {type Collection} from 'tinacms'

const tagsCollection: Collection = {
  label: 'Tags',
  name: 'tags',
  path: 'content/tags',
  format: 'json',
  ui: {
    global: true,
  },
  fields: [
    {
      type: 'string',
      label: 'Title',
      name: 'title',
      isTitle: true,
      required: true,
    },
  ],
}

export {tagsCollection}
