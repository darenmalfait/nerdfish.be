/* eslint-disable sort-keys */
import { GoSettings } from 'react-icons/go'

import type { Document } from '../../types/schema-types'
import { defaultLanguage } from '../../utils/languages'

export const siteSettings: Document = {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  // __experimental_actions: ['update', 'publish'], // disable for initial publish
  groups: [
    { name: 'global', title: 'Global', default: true },
    { name: 'navigation', title: 'Navigation' },
    { name: 'default', title: 'Default pages' },
  ],
  initialValue: {
    multilang: false,
  },
  icon: GoSettings,
  fields: [
    {
      name: 'multilang',
      title: 'multilanguage',
      group: 'global',
      description: 'Does this site support multilanguage?',
      type: 'boolean',
    },
    {
      name: 'title',
      title: 'Title',
      group: 'global',
      description: 'The default title of the site',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'description',
      group: 'global',
      title: 'Description',
      description: 'The default description of the site',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      title: 'Main navigation',
      group: 'navigation',
      name: 'mainNav',
      description: 'Select menu for main navigation',
      type: 'reference',
      to: [{ type: 'navigation' }],
      options: {
        filter: 'i18n_lang == $lang && _type == $type',
        filterParams: {
          lang: defaultLanguage()?.code || '',
          type: 'navigation',
        },
      },
      validation: Rule => Rule.required(),
    },
    {
      title: 'Actions navigation',
      group: 'navigation',
      name: 'actionsNav',
      description: 'Navigation items that need to stand out',
      type: 'reference',
      to: [{ type: 'navigation' }],
      options: {
        filter: 'i18n_lang == $lang && _type == $type',
        filterParams: {
          lang: defaultLanguage()?.code || '',
          type: 'navigation',
        },
      },
    },
    {
      title: 'Footer navigation',
      group: 'navigation',
      name: 'footerNav',
      description: 'Extra items that only appear in the footer',
      type: 'reference',
      to: [{ type: 'navigation' }],
      options: {
        filter: 'i18n_lang == $lang && _type == $type',
        filterParams: {
          lang: defaultLanguage()?.code || '',
          type: 'navigation',
        },
      },
    },
    {
      name: 'privacyPolicyPath',
      group: 'default',
      title: 'Privacy Policy',
      type: 'internalPage',
      validation: Rule => Rule.required(),
    },
  ],
}
