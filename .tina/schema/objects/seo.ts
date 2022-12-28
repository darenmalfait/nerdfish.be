import type {SchemaField} from 'tinacms'

const seo: SchemaField = {
  name: 'seo',
  label: 'SEO',
  type: 'object',
  fields: [
    {
      type: 'string',
      label: 'Title',
      name: 'title',
    },
    {
      type: 'string',
      label: 'Description',
      name: 'description',
      ui: {
        component: 'textarea',
      },
    },
    {
      type: 'string',
      label: 'Canonical',
      name: 'canonical',
    },
    {
      type: 'image',
      name: 'seoImg',
      label: 'Seo Image',
    },
    {
      type: 'image',
      name: 'partialSeoImage',
      label: 'Partial Seo Image',
    },
  ],
}

export {seo}
