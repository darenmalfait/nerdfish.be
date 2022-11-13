import { parseISO } from 'date-fns'
import { Feed } from 'feed'

import { getBlogPosts } from './api'

import type { BlogType } from '../../lib/types/cms'
import { BlogPath } from '../utils/constants'
import { getDatedSlug } from '../utils/routes'

async function buildFeed() {
  const feed = new Feed({
    title: 'Daren Malfait - Full Stack Web developer',
    description: "Daren's blog about full stack web development",
    id: 'https://daren.be',
    link: 'https://daren.be',
    copyright: 'Daren Malfait',
    language: 'en',
    author: {
      name: 'Daren Malfait',
      email: 'me@daren.be',
    },
  })

  const posts = await getBlogPosts()

  posts.forEach((post: BlogType) => {
    const link = `${process.env.NEXT_PUBLIC_URL}/${BlogPath}${getDatedSlug(
      parseISO(post.date || '').toISOString(),
      post._sys?.filename || '',
    )}`

    feed.addItem({
      title: post.title || '',
      id: link,
      link,
      description: post.excerpt || '',
      author: [
        {
          name: 'Daren Malfait',
          email: 'me@daren.be',
          link: 'https://www.daren.be',
        },
      ],
      date: parseISO(post.date || ''),
      image: post.heroImg || undefined,
    })
  })

  return feed
}

export { buildFeed }
