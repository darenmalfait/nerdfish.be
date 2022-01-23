import formatDate from 'date-fns/format'
import { MdDescription } from 'react-icons/md'

import SlugInput from 'sanity-plugin-better-slug'

import type { Document } from '../../types/schema-types'
import { defaultLanguage } from '../../utils/languages'
import { isUniqueAcrossAllDocuments } from '../../utils/slug'
import { i18n, i18nFields } from '../fragments/i18n'

export const post: Document = {
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  icon: MdDescription,
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
      type: 'string',
      title: 'Title',
      description: 'Titles should be catchy, descriptive, and not too long',
      group: 'content',
    },
    {
      name: 'category',
      type: 'string',
      title: 'Category',
      group: 'content',
      options: {
        list: [
          { title: 'Snippet', value: 'snippet' },
          { title: 'Technical', value: 'technical' },
          { title: 'Coaching', value: 'coaching' },
          { title: 'Project', value: 'project' },
          { title: 'Blog', value: 'blog' },
        ],
      },
    },
    {
      title: 'Slug',
      type: 'slug',
      name: 'slug',
      group: 'content',
      description: 'Used to determine the path.',
      inputComponent: SlugInput,
      options: {
        source: 'title',
        isUnique: isUniqueAcrossAllDocuments,
        slugify: (input: string) =>
          input.toLowerCase().replace(/\s+/g, '-').slice(0, 200),
      },
      validation: Rule => Rule.required(),
    },
    {
      name: 'publishedAt',
      group: 'content',
      type: 'datetime',
      title: 'Published at',
      description: 'This can be used to schedule post for publishing',
    },
    {
      group: 'content',
      name: 'image',
      type: 'image',
      title: 'Main image',
    },
    {
      group: 'content',
      name: 'excerpt',
      type: 'text',
      title: 'Excerpt',
      description:
        'This ends up on summary pages, on Google, when people share your post in social media.',
    },
    {
      group: 'content',
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [
        {
          type: 'author',
        },
      ],
    },
    {
      group: 'content',
      title: 'Tags',
      name: 'tags',
      type: 'tags',
    },
    {
      group: 'content',
      name: 'body',
      type: 'portableText',
      title: 'Body',
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
  orderings: [
    {
      name: 'publishingDateAsc',
      title: 'Publishing date new–>old',
      by: [
        {
          field: 'publishedAt',
          direction: 'asc',
        },
        {
          field: 'title',
          direction: 'asc',
        },
      ],
    },
    {
      name: 'publishingDateDesc',
      title: 'Publishing date old->new',
      by: [
        {
          field: 'publishedAt',
          direction: 'desc',
        },
        {
          field: 'title',
          direction: 'asc',
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      publishedAt: 'publishedAt',
      slug: 'slug',
      media: 'image',
    },
    prepare({ title = 'No title', publishedAt, slug = {}, media }) {
      const dateSegment = formatDate(new Date(publishedAt), 'yyyy/MM')
      const path = `/${dateSegment}/${slug.current || ''}/`
      return {
        title,
        media,
        subtitle: publishedAt ? path : 'Missing publishing date',
      }
    },
  },
}
