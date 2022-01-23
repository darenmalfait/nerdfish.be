// Import the default image upload component or whatever other asset source you want to provide
import DefaultSource from 'part:@sanity/form-builder/input/image/asset-source-default'
import * as React from 'react'
import { MediaEditor } from 'sanity-plugin-asset-source-ogimage'

import { pageCardLayout } from '../../components/seo/page-card'
import type { ObjectField } from '../../types/schema-types'

export const seo: ObjectField = {
  title: 'SEO',
  name: 'seo',
  type: 'object',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
    },
    {
      title: 'Description',
      name: 'description',
      type: 'text',
    },
    {
      title: 'Image',
      description: 'Facebook recommends 1200x630 (will be auto resized)',
      name: 'image',
      type: 'image',
      options: {
        sources: [
          DefaultSource,
          {
            name: 'sharing-image',
            title: 'Generate sharing image',
            component: (props: any) => (
              <MediaEditor
                {...props}
                layouts={[pageCardLayout]}
                dialog={{
                  title: 'Create sharing image',
                }}
              />
            ),
            icon: () => (
              <span role="img" aria-label="Create sharing image">
                🎨
              </span>
            ),
          },
        ],
      },
    },
    {
      title: 'Canonical',
      name: 'canonical',
      type: 'url',
      description: 'The link to the original page/article (if applicable)',
    },
  ],
  preview: {
    select: {
      title: 'title',
      route: 'route.slug.current',
      link: 'link',
    },
    prepare({ title, route, link }) {
      return {
        title,
        subtitle: route
          ? `Route: /${route}/`
          : link
          ? `External link: ${link}`
          : 'Not set',
      }
    },
  },
}
