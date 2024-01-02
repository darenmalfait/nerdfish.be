import {Feed} from 'feed'

import {env} from '~/env.mjs'
import {BlogPath} from '~/lib/utils/constants'
import {getDatedSlug} from '~/lib/utils/routes'

import {getBlogPosts} from '../api/cms'

async function buildFeed() {
  const feed = new Feed({
    title: 'Daren Malfait - Full Stack Web developer',
    description: "Daren's blog about full stack web development",
    id: 'https://nerdfish.be',
    link: 'https://nerdfish.be',
    copyright: 'Daren Malfait',
    language: 'en',
    author: {
      name: 'Daren Malfait',
      email: 'daren@nerdfish.be',
    },
  })

  const posts = (await getBlogPosts()) ?? []

  posts.reverse().forEach(post => {
    const link = `${env.NEXT_PUBLIC_URL}/${BlogPath}${getDatedSlug(
      new Date(post.date ?? '').toDateString(),
      post._sys?.filename ?? '',
    )}`

    feed.addItem({
      title: post.title ?? '',
      id: link,
      link,
      description: post.excerpt ?? '',
      author: [
        {
          name: 'Daren Malfait',
          email: 'daren@nerdfish.be',
          link: 'https://www.nerdfish.be',
        },
      ],
      date: new Date(post.date ?? ''),
      image: post.heroImg ?? undefined,
    })
  })

  return feed
}

export {buildFeed}
