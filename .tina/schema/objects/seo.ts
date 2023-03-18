import {type SchemaField} from 'tinacms'

const seo: SchemaField = {
  name: 'seo',
  label: 'SEO',
  type: 'object',
  ui: {
    defaultItem: {
      cardtype: 'primary',
    },
  },
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
    {
      type: 'string',
      name: 'cardType',
      label: 'Type of SEO card',
      description: 'Only applicable for partial SEO image',
      options: [
        {label: 'Primary', value: 'primary'},
        {label: 'Secondary', value: 'secondary'},
      ],
    },
  ],
}

export {seo}
