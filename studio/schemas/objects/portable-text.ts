import { ImageIcon, CodeIcon } from '@sanity/icons'
import { BsFileRichtext } from 'react-icons/bs'

import * as Renderers from '../../components/block-renderers'
import type { ArrayField } from '../../types/schema-types'

/**
 * it can be
 * reused in other parts of the studio with:
 *  {
 *    name: 'someName',
 *    title: 'Some title',
 *    type: 'portableText'
 *  }
 */
export const portableText: ArrayField = {
  title: 'Portable Text',
  name: 'portableText',
  type: 'array',
  icon: BsFileRichtext,
  of: [
    {
      title: 'Block',
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'H1', value: 'h1' },
        { title: 'H2', value: 'h2' },
        { title: 'H3', value: 'h3' },
        { title: 'H4', value: 'h4' },
        { title: 'Quote', value: 'blockquote' },
      ],
      lists: [
        { title: 'Bullet', value: 'bullet' },
        { title: 'Number', value: 'number' },
      ],
      marks: {
        // Decorators usually describe a single property – e.g. a typographic
        // preference or highlighting by editors.
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
          { title: 'Code', value: 'code' },
          { title: 'Strike', value: 'strike-through' },
        ],
        // Annotations can be any object structure – e.g. a link or a footnote.
        annotations: [
          {
            blockEditor: {
              render: Renderers.Button,
            },
            title: 'Link',
            name: 'link',
            type: 'object',
            fields: [
              {
                title: '(A) Internal Page',
                name: 'page',
                type: 'reference',
                to: [{ type: 'page' }],
              },
              {
                title: '(B) External URL',
                name: 'href',
                type: 'url',
                validation: Rule =>
                  Rule.uri({
                    allowRelative: true,
                    scheme: ['https', 'http', 'mailto', 'tel'],
                  }),
              },
              {
                title: 'Style as Button?',
                name: 'isButton',
                type: 'boolean',
              },
              {
                name: 'styles',
                type: 'object',
                fields: [
                  {
                    title: 'Button Style',
                    name: 'style',
                    type: 'string',
                    options: {
                      list: [
                        { title: 'Default', value: '' },
                        { title: 'Inverted', value: 'inverted' },
                      ],
                      layout: 'radio',
                    },
                  },
                  {
                    title: 'Full Width',
                    name: 'isBlock',
                    type: 'boolean',
                    options: {
                      layout: 'checkbox',
                    },
                  },
                ],
                hidden: ({ parent }: any): boolean => {
                  return !parent.isButton
                },
              },
            ],
          },
        ],
      },
    },
    // You can add additional types here. Note that you can't use
    // primitive types such as 'string' and 'number' in the same array
    // as a block type.
    { type: 'figureWithOptions', icon: ImageIcon },
    {
      type: 'code',
      icon: CodeIcon,
      options: {
        theme: 'monokai',
        options: {
          language: 'typescript',
        },
      },
    },
    { type: 'videoEmbed' },
    {
      type: 'reference',
      to: [{ type: 'companyInfo' }],
    },
    {
      type: 'contactForm',
    },
    {
      type: 'advancedTable',
    },
  ],
}
