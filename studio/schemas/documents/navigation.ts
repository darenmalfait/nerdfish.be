/* eslint-disable sort-keys */
import { AiOutlineMenuFold } from 'react-icons/ai'

import type { Document } from '../../types/schema-types'
import { defaultLanguage } from '../../utils/languages'
import { i18n, i18nFields } from '../fragments/i18n'

export const navigation: Document = {
  type: 'document',
  name: 'navigation',
  title: 'Navigation',
  icon: AiOutlineMenuFold,
  initialValue: {
    i18n_lang: defaultLanguage()?.code,
  },
  groups: [
    { name: 'general', title: 'General', default: true },
    { name: 'i18n', title: 'Languages' },
  ],
  i18n: {
    ...i18n(),
  },
  fields: [
    {
      type: 'string',
      name: 'title',
      group: 'general',
    },
    {
      type: 'array',
      name: 'items',
      of: [{ type: 'cta' }],
      group: 'general',
    },
    ...i18nFields(),
  ],
}
