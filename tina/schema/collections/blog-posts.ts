import {parseISO} from 'date-fns'
import {padStart} from 'lodash'
import slugify from 'slugify'
import {type Collection} from 'tinacms'

import {portableTextSchema, seo, tagsSchema} from '../objects'

const blogPostsCollection: Collection = {
  label: 'Blog Posts',
  name: 'blog',
  path: 'content/blogs',
  format: 'mdx',
  ui: {
    router: async ({document}) => {
      return `/blog/${document._sys.relativePath.substring(
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
      type: 'string',
      name: 'category',
      label: 'Category',
      options: ['technical', 'coaching', 'blog', 'project'],
      required: true,
    },
    {
      type: 'image',
      name: 'heroImg',
      label: 'Hero Image',
    },
    {
      type: 'string',
      label: 'Excerpt',
      name: 'excerpt',
      component: 'textarea',
    },
    {
      type: 'datetime',
      label: 'Posted Date',
      name: 'date',
      ui: {
        dateFormat: 'MMMM DD YYYY',
        timeFormat: 'hh:mm A',
      },
      required: true,
    },
    {
      ...portableTextSchema,
      label: 'Body',
      name: 'body',
      isBody: true,
    },
  ],
}

export {blogPostsCollection}
