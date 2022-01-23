import { i18n } from '../../schemas/fragments/i18n'
import type { ObjectField } from '../../types/schema-types'

export const cookieMessage: ObjectField = {
  name: 'cookieMessage',
  type: 'object',
  fields: [
    {
      title: 'Message',
      name: 'value',
      type: 'text',
      rows: 3,
      description: 'What does this do?',
    },
  ],
}

export const cookie: ObjectField = {
  name: 'cookie',
  type: 'object',
  fields: [
    {
      title: 'Tracking',
      name: 'enabled',
      type: 'boolean',
      description: 'Will only work if tracking cookies are set in Tag Manager.',
    },
    {
      title: 'Tracking',
      name: 'message',
      type: 'cookieMessage',
      options: {
        ...i18n(false),
      },
    },
  ],
}
