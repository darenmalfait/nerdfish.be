/* eslint-disable sort-keys */
import { AiFillYoutube } from 'react-icons/ai'

import { VideoEmbedPreview } from '../../components/video-embed-preview'
import type { ObjectField } from '../../types/schema-types'

export const videoEmbed: ObjectField = {
  name: 'videoEmbed',
  type: 'object',
  title: 'Video',
  icon: AiFillYoutube,
  fields: [
    {
      type: 'string',
      title: 'type',
      name: 'videoType',
      options: {
        list: [
          { title: 'url', value: 'url' },
          { title: 'file', value: 'file' },
        ],
        layout: 'radio',
      },
    },
    {
      type: 'url',
      title: 'Video url',
      name: 'url',
      hidden: ({ parent }: any): boolean => {
        return !(!parent || parent.videoType === 'url')
      },
    },
    {
      type: 'file',
      title: 'Video file',
      name: 'file',
      hidden: ({ parent }) => {
        return !(parent.videoType === 'file')
      },
    },
    {
      type: 'image',
      title: 'Image placeholder',
      description: 'image that will be shown if the video has not been played.',
      name: 'placeholder',
      validation: Rule => Rule.required(),
    },
  ],
  preview: {
    select: {
      url: 'url',
    },
    component: VideoEmbedPreview,
  },
}
