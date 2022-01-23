import { RiPagesLine } from 'react-icons/ri'
import SlugInput from 'sanity-plugin-better-slug'

import type { Document } from '../../types/schema-types'
import { defaultLanguage, isDefaultLanguage } from '../../utils/languages'
import { isUniqueAcrossAllDocuments } from '../../utils/slug'
import { i18n, i18nFields } from '../fragments/i18n'

/* eslint-disable sort-keys */
export const page: Document = {
  name: 'page',
  title: 'Page',
  type: 'document',
  icon: RiPagesLine,
  initialValue: {
    i18n_lang: defaultLanguage()?.code,
  },
  i18n: {
    ...i18n(),
  },
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'seo', title: 'SEO' },
    { name: 'i18n', title: 'Language' },
  ],
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content',
    },
    {
      title: 'Url Slug',
      type: 'slug',
      name: 'slug',
      group: 'content',
      description: "Used to determine the path. Put in 'home' for homepage.",
      inputComponent: SlugInput,
      options: {
        source: 'title',
        isUnique: isUniqueAcrossAllDocuments,
        slugify: (input: string) =>
          input.toLowerCase().replace(/\s+/g, '-').slice(0, 200),
        basePath: async ({
          i18n_lang: lang = defaultLanguage()?.code || '',
        }: {
          i18n_lang: string
        }): Promise<string> => {
          if (lang === defaultLanguage()?.code) {
            return process.env.SANITY_STUDIO_PROJECT_URL || ''
          }

          return `${process.env.SANITY_STUDIO_PROJECT_URL}${
            lang ? `/${lang}` : ''
          }`
        },
      },
      validation: Rule => Rule.required(),
    },
    {
      title: 'Body',
      name: 'body',
      type: 'blocks',
      group: 'content',
      description: 'Add, edit, and reorder sections',
      validation: Rule => Rule.required(),
    },
    {
      title: 'Tags',
      name: 'tags',
      type: 'tags',
      group: 'content',
    },
    {
      title: 'SE0 / Share settings',
      description: 'These values populate meta tags',
      name: 'seo',
      type: 'seo',
      group: 'seo',
    },
    ...i18nFields(),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'slug.current',
      lang: 'i18n_lang',
      media: 'seo.media',
    },
    prepare({ title, subtitle, lang, media }) {
      return {
        title,
        subtitle: `/${isDefaultLanguage(lang) ? '' : `${lang}/`}${[subtitle]
          .join('')
          .replace(/\/$/, '')}`,
        media,
      }
    },
  },
}
