import { FaImage } from 'react-icons/fa'

import type { ImageField, RuleType } from '../types/schema-types'

interface CustomImageProps {
  hasOptions?: boolean
  name?: string
}

function customImage({
  hasOptions = false,
  name = 'figure',
}: CustomImageProps = {}): ImageField {
  return {
    name,
    title: 'Figure',
    type: 'image',
    icon: FaImage,
    options: {
      hotspot: false,
    },
    fields: [
      {
        name: 'alt',
        title: 'Alternative text (for screen readers)',
        type: 'string',
        options: {
          isHighlighted: true,
        },
        validation: (Rule: RuleType): RuleType => {
          return Rule.custom((field, context) =>
            'asset' in context.parent && field === undefined
              ? 'Required! (think about non-visual readers)'
              : true,
          )
        },
      },
      ...(hasOptions
        ? [
            {
              title: 'Size',
              name: 'size',
              type: 'string',
              options: {
                list: [
                  { title: 'Small', value: 'small' },
                  { title: 'Default', value: 'default' },
                  { title: 'Medium', value: 'medium' },
                  { title: 'Full', value: 'full' },
                ],
                layout: 'radio',
              },
            },
            {
              title: 'Shadow',
              name: 'shadow',
              type: 'boolean',
            },
            {
              title: 'Zoom',
              name: 'zoom',
              type: 'boolean',
            },
          ]
        : []),
    ],
    preview: {
      select: {
        asset: 'asset',
        alt: 'alt',
      },
      prepare({ alt, asset }) {
        return {
          title: alt || '(alt text missing)',
          media: asset,
        }
      },
    },
  }
}

export default customImage
