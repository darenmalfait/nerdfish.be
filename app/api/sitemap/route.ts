import {env} from '~/env.mjs'
import {getSitemapData} from '~/lib/api/cms'
import {getDatedSlug} from '~/lib/utils/routes'

const BASE_URL = env.NEXT_PUBLIC_URL

export async function GET() {
  try {
    const data = await getSitemapData()

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset
        xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
              http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
    ${data.pages
      ?.map((page: any) => {
        return `
          <url>
            <loc>${BASE_URL}/${
              page._sys.filename !== 'home' ? page._sys.filename : ''
            }</loc>
            <priority>1.00</priority>
          </url>
        `
      })
      .join('')}
    ${data.blogs?.map((blog: any) => {
      return `
        <url>
          <loc>${BASE_URL}/blog/${getDatedSlug(
            blog.date ?? new Date().toISOString(),
            blog._sys.filename ?? '',
          )}</loc>
          <priority>0.80</priority>
        </url>
      `
    })}
    ${data.wikis?.map((wiki: any) => {
      return `
        <url>
          <loc>${BASE_URL}/wiki/${getDatedSlug(
            wiki.date ?? new Date().toISOString(),
            wiki._sys.filename ?? '',
          )}</loc>
          <priority>0.50</priority>
        </url>
      `
    })}
  </urlset>
  `

    return new Response(xml, {
      status: 200,
      headers: {
        'content-type': 'application/xml; charset=utf-8',
      },
    })
  } catch (error) {
    return new Response(`Failed to get sitemap`, {
      status: 500,
    })
  }
}
