import {parseISO} from 'date-fns'
import {padStart} from 'lodash'
import slugify from 'slugify'
import {type Collection} from 'tinacms'

import {portableTextSchema, seo, tagsSchema} from '../objects'

const wikiCollection: Collection = {
  label: 'Wiki',
  name: 'wiki',
  path: 'content/wiki',
  format: 'mdx',
  ui: {
    router: async ({document}) => {
      return `/wiki/${document._sys.relativePath.substring(
        0,
        document._sys.relativePath.lastIndexOf('.'),
      )}`
    },
    filename: {
      readonly: true,
      slugify: values => {
        const date = parseISO(values.date)
        const year = date.getFullYear()
        const month = padStart((date.getMonth() + 1).toString(), 2, '0')

        let slug = values.title ? slugify(values.title.toLowerCase()) : ''

        if (values.date) {
          slug = `${year}/${month}/${slug}`
        }

        return slug
      },
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
    tagsSchema,
    {
      type: 'rich-text',
      label: 'Excerpt',
      name: 'excerpt',
    },
    {
      required: true,
      type: 'datetime',
      label: 'Posted Date',
      name: 'date',
      ui: {
        dateFormat: 'MMMM DD YYYY',
        timeFormat: 'hh:mm A',
      },
    },
    {
      ...portableTextSchema,
      label: 'Body',
      name: 'body',
      isBody: true,
    },
  ],
}

export {wikiCollection}
