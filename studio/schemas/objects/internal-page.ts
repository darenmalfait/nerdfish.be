import { RiPagesLine } from 'react-icons/ri'

import type { ReferenceField } from '../../types/schema-types'

export const internalPage: ReferenceField = {
  name: 'internalPage',
  title: 'Internal Page',
  icon: RiPagesLine,
  type: 'reference',
  to: [{ type: 'page' }],
}
