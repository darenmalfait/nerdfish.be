/* eslint-disable sort-keys */
import { AiOutlineForm } from 'react-icons/ai'

import type { ObjectField } from '../../types/schema-types'

export const contactForm: ObjectField = {
  title: 'Contact Form',
  name: 'contactForm',
  type: 'object',
  icon: AiOutlineForm,
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: 'Contact Form',
        subTitle: title,
        media: AiOutlineForm,
      }
    },
  },
}
