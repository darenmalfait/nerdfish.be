import { colors } from '@daren/theme'

import type { ObjectField } from '../../types/schema-types'

export const staticBackground: ObjectField = {
  title: 'Static Background Colour',
  name: 'staticBackground',
  type: 'object',
  fields: [
    {
      title: 'Static',
      description: 'Pick a color',
      name: 'color',
      type: 'colorlist',
      options: {
        borderradius: {
          outer: '100%',
          inner: '100%',
        },
        list: [
          {
            title: 'Background Primary 500',
            value: (colors as any).background[500],
          },
          {
            title: 'Background Primary 600',
            value: (colors as any).background[600],
          },
          {
            title: 'Background Primary 700',
            value: (colors as any).background[700],
          },
          {
            title: 'Background Primary 800',
            value: (colors as any).background[800],
          },
          {
            title: 'Background Primary 900',
            value: (colors as any).background[900],
          },
        ],
      },
    },
    {
      title: 'Color based on image',
      name: 'imageColor',
      type: 'image',
      description:
        'An algorithm will decide a color to pick as background based on the provided image',
    },
  ],
}
