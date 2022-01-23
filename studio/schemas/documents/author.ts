import { BsFillPersonFill } from 'react-icons/bs'

import type { Document } from '../../types/schema-types'

export const author: Document = {
  name: 'author',
  title: 'Author',
  type: 'document',
  icon: BsFillPersonFill,
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name',
    },
    {
      name: 'image',
      type: 'image',
      title: 'Image',
    },
    {
      name: 'bio',
      type: 'portableText',
      title: 'Biography',
    },
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
    },
  },
}
