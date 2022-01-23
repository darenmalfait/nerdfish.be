import { AiFillTags } from 'react-icons/ai'

import type { Document } from '../../types/schema-types'

export const tag: Document = {
  name: 'tag',
  title: 'Tag',
  icon: AiFillTags,
  type: 'document',
  fields: [
    {
      name: 'value',
      type: 'string',
    },
    {
      name: 'label',
      type: 'string',
    },
  ],
  preview: {
    select: {
      title: 'value',
    },
    prepare({ title }) {
      return {
        title,
      }
    },
  },
}
