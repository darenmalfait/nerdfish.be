import type {LoaderArgs} from '@remix-run/node'

import {buildFeed} from '~/lib/services/feed.server'

export async function loader({request}: LoaderArgs) {
  const feed = await buildFeed(request)

  return new Response(feed.rss2(), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'x-content-type-options': 'nosniff',
    },
  })
}
