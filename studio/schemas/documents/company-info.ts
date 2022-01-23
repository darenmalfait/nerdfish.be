import { MdBusiness } from 'react-icons/md'

import type { Document } from '../../types/schema-types'

export const companyInfo: Document = {
  name: 'companyInfo',
  title: 'Company Info',
  type: 'document',
  __experimental_actions: ['update', 'publish'], // disable for initial publish
  icon: MdBusiness,
  fields: [
    {
      name: 'name',
      title: 'Company name',
      type: 'string',
    },
    {
      name: 'email',
      title: 'Email',
      type: 'email',
    },
    {
      name: 'address',
      title: 'Address',
      type: 'string',
    },
    {
      name: 'phone',
      title: 'Phone',
      type: 'string',
    },
  ],
}
