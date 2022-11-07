import type { RichTextType } from 'tinacms'

const portableTextSchema: RichTextType = {
  label: 'Text',
  name: 'text',
  type: 'rich-text',
  templates: [
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
            { label: 'Primary', value: 'primary' },
            { label: 'Secondary', value: 'secondary' },
            { label: 'Danger', value: 'danger' },
            { label: 'Success', value: 'success' },
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

export { portableTextSchema }
