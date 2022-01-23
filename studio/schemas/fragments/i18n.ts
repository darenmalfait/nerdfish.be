import languages from '../../../config/languages'

import type { I18n } from '../../types/schema-types'
import { defaultLanguage } from '../../utils/languages'

export function i18n(hasFieldNames = true): I18n {
  return {
    ...(hasFieldNames
      ? [
          {
            fieldNames: {
              lang: 'i18n_lang',
              references: 'i18n_refs',
            },
          },
        ]
      : []),
    i18n: true,
    base: defaultLanguage()?.code || '',
    languages: languages.map(({ code }) => code),
  }
}

export function i18nFields(fieldset?: string) {
  return [
    {
      fieldset,
      title: 'Language',
      name: 'i18n_lang',
      type: 'string',
      group: 'i18n',
      options: {
        list: [
          ...languages.map(({ code, label }) => ({
            title: label,
            value: code,
          })),
        ],
      },
    },
    {
      fieldset,
      title: 'Referenced Languages',
      name: 'i18n_refs',
      type: 'array',
      group: 'i18n',
      of: [
        {
          type: 'i18n_refs_object',
        },
      ],
    },
  ]
}
