import { IoMdShare } from 'react-icons/io'

import type { ObjectField } from '../../types/schema-types'

export const social: ObjectField = {
  title: 'Social',
  name: 'social',
  type: 'object',
  icon: IoMdShare,
  options: {
    collapsible: true,
  },
  fields: [
    {
      title: 'Name',
      name: 'name',
      type: 'string',
    },
    {
      title: 'Link',
      name: 'link',
      type: 'url',
    },
  ],
  preview: {
    select: {
      title: 'name',
    },
    prepare({ title }) {
      return {
        title,
      }
    },
  },
}
