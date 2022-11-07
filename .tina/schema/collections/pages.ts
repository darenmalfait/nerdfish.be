import { Collection } from 'tinacms'

import { blocks } from '../blocks'
import { seo } from '../objects'

const pagesColllection: Collection = {
  label: 'Pages',
  name: 'page',
  path: 'content/pages',
  ui: {
    router: ({ document }) => {
      if (document._sys.filename === 'home') {
        return `/`
      }

      return `/${document._sys.filename}`
    },
  },
  fields: [
    seo,
    {
      type: 'string',
      label: 'Title',
      name: 'title',
      isTitle: true,
      required: true,
    },
    {
      type: 'object',
      list: true,
      name: 'blocks',
      label: 'Sections',
      ui: {
        visualSelector: true,
      },
      templates: [...blocks],
    },
  ],
}

export { pagesColllection }
