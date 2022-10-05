import { json, LoaderArgs } from '@remix-run/node'
import formatDate from 'date-fns/format'

import { getAllPosts, getBlogPost } from '~/lib/api'
import { groq } from '~/lib/api/sanity'
import { getDoc } from '~/lib/api/sanity/queries'
import { i18n } from '~/lib/services/i18n.server'
import { getDefaultLanguage, localizeSlug } from '~/lib/utils/i18n'
import { getDomainUrl } from '~/lib/utils/misc'
import { removeTrailingSlash } from '~/lib/utils/string'
import { Handle, PageType } from '~/types'

const query = groq`${getDoc(PageType.blog, true)}`

export const handle: Handle = {
  getSitemapEntries: async () => {
    const posts = await getAllPosts()

    return posts.map(({ slug, lang, publishedAt }) => {
      const year = formatDate(new Date(publishedAt), 'yyyy')
      const month = formatDate(new Date(publishedAt), 'MM')

      return { route: `/${lang}/${year}/${month}/${slug}`, priority: 0.3 }
    })
  },
}

export async function loader({ request, params }: LoaderArgs) {
  const lang = await i18n.getLocale(request)

  const requestUrl = new URL(request.url)

  const headers = {
    'Cache-Control': 'private, max-age=3600',
    Vary: 'Cookie',
  }

  if (!params.slug) {
    throw json('Page not found', { status: 404, headers })
  }

  const preview =
    requestUrl.searchParams.get('preview') ===
    process.env.SANITY_STUDIO_PREVIEW_SECRET

  const data = await getBlogPost({
    // home is the slug that is used in the studio for the home page
    slug: params.slug,
    preview,
    lang,
  })

  // if there is no blogpost with the current settings, return a 404
  if (!data.siteConfig?.site?.multilang && lang !== getDefaultLanguage().code) {
    throw json('Page not found', { status: 404, headers })
  }

  const canonical =
    data.post.seo?.canonical ??
    removeTrailingSlash(
      `${getDomainUrl(request)}${localizeSlug(
        data.post.slug || '',
        lang,
        PageType.blog,
      )}`,
    )

  return json(
    {
      data: data.post,
      preview,
      canonical,
      query: preview ? query : ``,
      params: preview
        ? { slug: data.post.slug, lang, type: PageType.page }
        : {},
    },
    { status: 200, headers },
  )
}

type LoaderType = typeof loader

export type { LoaderType }
