import type { ObjectField } from '~/types/schema-types'

export const Link: ObjectField = {
  name: 'link',
  title: 'Link',
  type: 'object',
  initialValue: {
    style: `primary`,
  },
  fields: [
    {
      name: `text`,
      type: `string`,
      validation: Rule => Rule.required(),
    },
    {
      name: `style`,
      type: `string`,
      description: `The style of the link`,
      options: {
        list: [
          { title: 'Primary', value: 'primary' },
          { title: 'Secondary', value: 'secondary' },
        ],
      },
    },
    {
      name: `reference`,
      type: `reference`,
      description: `If this link has a reference and a URL, the reference will be used`,
      to: [{ type: 'page' }, { type: 'post' }],
    },
    {
      name: `link`,
      type: `url`,
      description: `Must be a full URL`,
      validation: Rule =>
        Rule.custom(url =>
          url && url.startsWith('http://')
            ? 'Please start links with https://'
            : true,
        ),
    },
  ],
  preview: {
    select: {
      title: 'text',
      url: 'link',
      ref: 'reference.slug.current',
    },
    prepare(selection) {
      const { title, url, ref } = selection

      const subtitle = !url && !ref ? `Empty Link` : ref ?? url

      return {
        title: title ?? '',
        subtitle,
      }
    },
  },
}
