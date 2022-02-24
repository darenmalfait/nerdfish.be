import { json } from 'remix'
import type { LoaderFunction } from 'remix'

import { getAllPages, getPage } from '~/lib/api'
import { groq } from '~/lib/api/sanity'
import { getDoc } from '~/lib/api/sanity/queries'
import {
  getDefaultLanguage,
  localizeSlug,
  validateLanguage,
} from '~/lib/utils/i18n'
import { getDomainUrl } from '~/lib/utils/misc'
import { getSession } from '~/lib/utils/session.server'
import { removeTrailingSlash } from '~/lib/utils/string'
import { Handle, PageType, RouteLoader, SanityPage } from '~/types'

export type LoaderData = RouteLoader<SanityPage>

const query = groq`${getDoc(PageType.page, true)}`

export const loader: LoaderFunction = async ({ request, params }) => {
  const session = await getSession(request, params)
  const lang = session.getLanguage() || getDefaultLanguage().code

  const requestUrl = new URL(request?.url)
  const preview =
    requestUrl.searchParams.get(`preview`) ===
    process.env.SANITY_STUDIO_PREVIEW_SECRET

  const headers = {
    'Cache-Control': 'private, max-age=3600',
    Vary: 'Cookie',
  }

  if (params.lang && !validateLanguage(params.lang)) {
    throw json('Page not found', { status: 404, headers })
  }

  const slug = params.slug ?? 'home'
  const data = await getPage({
    // home is the slug that is used in the studio for the home page
    slug,
    preview,
    lang,
  })

  // if there is no page with the current settings, return a 404
  if (
    !data.page ||
    (!data.siteConfig?.site?.multilang && lang !== getDefaultLanguage().code)
  ) {
    throw json('Page not found', { status: 404, headers })
  }

  const canonical =
    data.page.seo?.canonical ??
    removeTrailingSlash(
      `${getDomainUrl(request)}${localizeSlug(data?.page?.slug || '', lang)}`,
    )

  return json<LoaderData>(
    {
      data: data.page,
      preview,
      canonical,
      query: preview ? query : ``,
      params: preview ? { slug, lang, type: PageType.page } : {},
    },
    { status: 200, headers },
  )
}

export const handle: Handle = {
  getSitemapEntries: async () => {
    const pages = await getAllPages()

    return pages.map(page => {
      let route = `/${page.lang}/${page.slug}`
      if (page.slug === 'home') {
        if (page.lang === getDefaultLanguage().code) {
          // index route already exists
          return null
        }

        route = `/${page.lang}/`
      }
      return { route, priority: 0.6 }
    })
  },
}
