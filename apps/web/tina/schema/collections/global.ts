import {type Collection} from 'tinacms'

const globalCollection: Collection = {
  label: 'Global',
  name: 'global',
  path: 'content/global',
  format: 'json',
  ui: {
    global: true,
  },
  fields: [
    {
      type: 'object',
      label: 'Navigation',
      name: 'navigation',
      fields: [
        {
          type: 'object',
          label: 'Main navigation',
          name: 'main',
          list: true,
          ui: {
            itemProps: item => {
              return {label: item.label}
            },
            defaultItem: {
              href: 'home',
              label: 'Home',
            },
          },
          fields: [
            {
              type: 'string',
              label: 'Label',
              name: 'label',
              required: true,
            },
            {
              type: 'string',
              label: 'Link',
              name: 'href',
              description:
                'If there are sub navigation items, this link will be ignored.',
            },
            {
              type: 'object',
              label: 'Sub navigation',
              name: 'sub',
              list: true,
              ui: {
                itemProps: item => {
                  return {label: item.label}
                },
                defaultItem: {
                  href: 'sub',
                  label: 'Sub',
                },
              },
              fields: [
                {
                  type: 'string',
                  label: 'Label',
                  name: 'label',
                  required: true,
                },
                {
                  type: 'string',
                  label: 'Description',
                  name: 'description',
                },
                {
                  type: 'string',
                  label: 'Link',
                  name: 'href',
                  required: true,
                },
              ],
            },
          ],
        },
        {
          type: 'object',
          label: 'Actions',
          name: 'actions',
          list: true,
          ui: {
            itemProps: item => {
              return {label: item.label}
            },
            defaultItem: {
              href: 'action',
              label: 'action',
            },
          },
          fields: [
            {
              type: 'string',
              label: 'Link',
              name: 'href',
              required: true,
            },
            {
              type: 'string',
              label: 'Label',
              name: 'label',
              required: true,
            },
          ],
        },
      ],
    },
    {
      type: 'object',
      label: 'Social Links',
      name: 'social',
      fields: [
        {
          type: 'string',
          label: 'Facebook',
          name: 'facebook',
        },
        {
          type: 'string',
          label: 'Twitter',
          name: 'twitter',
        },
        {
          type: 'string',
          label: 'Instagram',
          name: 'instagram',
        },
        {
          type: 'string',
          label: 'Github',
          name: 'github',
        },
        {
          type: 'string',
          label: 'LinkedIn',
          name: 'linkedIn',
        },
      ],
    },
    {
      type: 'object',
      label: 'Paths',
      name: 'paths',
      fields: [
        {
          type: 'string',
          label: 'Wiki',
          name: 'wiki',
        },
        {
          type: 'string',
          label: 'Blog',
          name: 'blog',
        },
        {
          type: 'string',
          label: 'Contact',
          name: 'contact',
        },
      ],
    },
    {
      type: 'object',
      label: 'Company info',
      name: 'companyInfo',
      fields: [
        {
          type: 'string',
          label: 'Company name',
          name: 'companyName',
        },
        {
          type: 'string',
          label: 'VAT',
          name: 'vat',
        },
      ],
    },
  ],
}

export {globalCollection}
