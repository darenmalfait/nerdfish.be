import type { ObjectField } from '../../types/schema-types'

export const i18nRefsObject: ObjectField = {
  name: 'i18n_refs',
  type: 'object',
  fields: [
    {
      type: 'string',
      name: 'lang',
    },
    {
      type: 'reference',
      name: 'ref',
      to: [{ type: 'page' }],
    },
  ],
}
