import type {NextApiRequest, NextApiResponse} from 'next'

import {buildFeed} from '../../../lib/services/feed'

export default async (_req: NextApiRequest, res: NextApiResponse) => {
  const feed = await buildFeed()

  res.statusCode = 200
  res.setHeader('content-type', 'application/xml; charset=utf-8')
  res.end(feed.rss2())
}
