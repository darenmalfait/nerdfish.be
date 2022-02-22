/* eslint-disable sort-keys */
import { GoMegaphone } from 'react-icons/go'

import type { ObjectField } from '../../types/schema-types'
import { isDefaultLanguage } from '../../utils/languages'

export const cta: ObjectField = {
  title: 'Call to action',
  name: 'cta',
  type: 'object',
  icon: GoMegaphone,
  fieldsets: [
    {
      title: 'Link',
      name: 'link',
    },
  ],
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
    },
    {
      title: 'Internal Page',
      name: 'internalPage',
      fieldset: 'link',
      type: 'internalPage',
    },
    {
      title: 'External link',
      name: 'link',
      type: 'string',
      description: 'Example: https://www.google.com',
      fieldset: 'link',
    },
    {
      title: 'Kind',
      name: 'kind',
      type: 'string',
      options: {
        layout: 'radio',
        list: ['button', 'link', 'arrow', 'double-label'],
      },
    },
    {
      title: 'Description',
      name: 'description',
      type: 'string',
      hidden: ({ parent }) => parent.kind !== 'double-label',
    },
  ],
  preview: {
    select: {
      title: 'title',
      internalPage: 'internalPage.slug.current',
      lang: 'internalPage.i18n_lang',
      link: 'link',
    },
    prepare({ title, internalPage, lang, link }) {
      let subtitle = 'Not set'
      if (internalPage) {
        subtitle = `Internal: /${
          isDefaultLanguage(lang) ? '' : `${lang}/`
        }${internalPage.replace(/\/$/, '')}`
      }
      if (link) {
        subtitle = `External: ${link}`
      }
      return {
        title,
        subtitle,
      }
    },
  },
}
