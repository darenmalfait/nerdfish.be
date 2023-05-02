import {type NextApiRequest, type NextApiResponse} from 'next'

import {env} from '~/env.mjs'
import {getSitemapData} from '~/lib/services/api'
import {getDatedSlug} from '~/lib/utils/routes'

const BASE_URL = env.NEXT_PUBLIC_URL

export default async (_req: NextApiRequest, res: NextApiResponse) => {
  const data = await getSitemapData()

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset
        xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
              http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
    ${data.pages
      ?.map(page => {
        return `
          <url>
            <loc>${BASE_URL}/${
          page._sys?.filename !== 'home' ? page._sys?.filename : ''
        }</loc>
            <priority>1.00</priority>
          </url>
        `
      })
      .join('')}
    ${data.blogs?.map(blog => {
      return `
        <url>
          <loc>${BASE_URL}/blog/${getDatedSlug(
        blog.date ?? new Date().toISOString(),
        blog._sys?.filename ?? '',
      )}</loc>
          <priority>0.80</priority>
        </url>
      `
    })}
    ${data.wikis?.map(wiki => {
      return `
        <url>
          <loc>${BASE_URL}/wiki/${getDatedSlug(
        wiki.date ?? new Date().toISOString(),
        wiki._sys?.filename ?? '',
      )}</loc>
          <priority>0.50</priority>
        </url>
      `
    })}
  </urlset>
  `

  res.statusCode = 200
  res.setHeader('content-type', 'application/xml; charset=utf-8')
  res.end(xml)
}
