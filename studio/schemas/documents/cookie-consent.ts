import { BiCookie } from 'react-icons/bi'

import type { Document } from '../../types/schema-types'

export const cookieConsent: Document = {
  name: 'cookieConsent',
  title: 'Cookie Consent',
  type: 'document',
  // __experimental_actions: ['update', 'publish'], // disable for initial publish
  icon: BiCookie,
  initialValue: {
    enabled: true,
  },
  fieldsets: [{ name: 'advanced', title: 'Advanced' }],

  fields: [
    {
      title: 'Enable cookie banner',
      name: 'enabled',
      type: 'boolean',
      description: 'Enable or disable the cookie consent banner.',
    },
    {
      name: 'cookiePolicyNote',
      type: 'note',
      options: {
        headline: 'Important',
        message:
          'It is strongly encouraged to include a link to details about your cookies usage and policies.',
        tone: 'caution',
      },
    },
    {
      title: 'Message',
      name: 'message',
      type: 'portableText',
      description: 'Your cookie consent message.',
    },
    {
      type: 'cookie',
      description: 'The cookie to be set for tracking cookies.',
      fieldset: 'advanced',
      title: 'Tracking',
      name: 'tracking',
      initialValue: {
        enabled: false,
        message: {
          en: {
            value:
              'Analytical cookies are used to understand how visitors interact with the website. These cookies help provide information on metrics the number of visitors, bounce rate, traffic source, etc.',
          },
          nl: {
            value:
              'Analytische cookeis worden gebriukt om te begrijpen hoe bezoekers gebruik maken van de website. Deze cookies helpen informatie te verkrijgen over de hoeveelheid bezoekers, bounce rates, traffic source, enz.',
          },
        },
      },
      options: {
        collapsible: true,
        collapsed: true,
      },
    },
    {
      type: 'cookie',
      description: 'The cookie to be set for marketing cookies.',
      fieldset: 'advanced',
      title: 'Advertisement',
      name: 'advertisement',
      initialValue: {
        enabled: false,
        message: {
          en: {
            value:
              'Advertisement cookies are used to provide visitors with relevant ads and marketing campaigns. These cookies track visitors across websites and collect information to provide customized ads.',
          },
          nl: {
            value:
              'Advertentiecookies worden gebruikt om gebriukers te voorzien van relevante ads en marketing campagnes. Deze cookies volgen gebruiker over verschillende website en verzamelen gegevens om gepersonaliseerde advertenties te tonen.',
          },
        },
      },
      options: {
        collapsible: true,
        collapsed: true,
      },
    },
  ],
  preview: {
    prepare() {
      return {
        title: 'Cookie Consent Settings',
      }
    },
  },
}
