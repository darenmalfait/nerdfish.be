import { BsTable } from 'react-icons/bs'

import type { ObjectField } from '../../types/schema-types'

export const advancedTable: ObjectField = {
  name: 'advancedTable',
  title: 'Table',
  type: 'object',
  icon: BsTable,
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'content', title: 'Content', type: 'portableText' },
    { name: 'table', title: 'Table', type: 'table' },
    { name: 'cta', title: 'Call to Action', type: 'cta' },
  ],
}
