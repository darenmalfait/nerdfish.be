/* eslint-disable sort-keys */
import { TiSocialAtCircular } from 'react-icons/ti'

import type { Document } from '../../types/schema-types'

export const socials: Document = {
  title: 'Socials',
  type: 'document',
  name: 'socials',
  __experimental_actions: ['update', 'publish'], // disable for initial publish
  icon: TiSocialAtCircular,
  fields: [
    {
      type: 'array',
      name: 'items',
      of: [{ type: 'social' }],
    },
  ],
}
