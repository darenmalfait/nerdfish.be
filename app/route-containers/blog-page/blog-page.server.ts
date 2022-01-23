import formatDate from 'date-fns/format'
import { json } from 'remix'
import type { LoaderFunction } from 'remix'

import { getAllPosts, getBlogPost } from '~/lib/api'
import { groq } from '~/lib/sanity'
import { getDoc } from '~/lib/sanity/queries'
import { getSession } from '~/session.server'
import { Handle, PageType, RouteLoader, SanityPost } from '~/types'
import { getDefaultLanguage, localizeSlug } from '~/utils/i18n'
import { getDomainUrl } from '~/utils/misc'
import { removeTrailingSlash } from '~/utils/string'

export type LoaderData = RouteLoader<SanityPost>

const query = groq`${getDoc(PageType.blog, true)}`

export const loader: LoaderFunction = async ({ request, params }) => {
  const session = await getSession(request, params)
  const lang = session.getLanguage() || getDefaultLanguage().code

  const requestUrl = new URL(request?.url)

  const headers = {
    'Cache-Control': 'private, max-age=3600',
    Vary: 'Cookie',
  }

  if (!params.slug) {
    throw json('Page not found', { status: 404, headers })
  }

  const preview =
    requestUrl?.searchParams?.get('preview') ===
    process.env.SANITY_STUDIO_PREVIEW_SECRET

  const data = await getBlogPost({
    // home is the slug that is used in the studio for the home page
    slug: params.slug as string,
    preview,
    lang,
  })

  // if there is no blogpost with the current settings, return a 404
  if (
    !data.post ||
    (!data.siteConfig?.site?.multilang && lang !== getDefaultLanguage().code)
  ) {
    throw json('Page not found', { status: 404, headers })
  }

  const canonical =
    data.post.seo?.canonical ??
    removeTrailingSlash(
      `${getDomainUrl(request)}${localizeSlug(
        data?.post?.slug || '',
        lang,
        PageType.blog,
      )}`,
    )

  return json<LoaderData>(
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
