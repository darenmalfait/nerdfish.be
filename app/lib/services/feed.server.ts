import {Feed} from 'feed'

import {BlogPath} from '../utils/constants'
import {getDomainUrl} from '../utils/misc'
import {getDatedSlug} from '../utils/routes'
import {getAllBlogPosts} from './content.server'

async function buildFeed(request: Request) {
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

  const posts = (await getAllBlogPosts()) ?? []

  const domainUrl = getDomainUrl(request)

  posts.forEach(post => {
    const link = `${domainUrl}/${BlogPath}${getDatedSlug(
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
          email: 'me@daren.be',
          link: 'https://www.daren.be',
        },
      ],
      date: new Date(post.date ?? ''),
      image: post.heroImg ?? undefined,
    })
  })

  feed.items = feed.items.reverse()

  return feed
}

export {buildFeed}
