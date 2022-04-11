import { json, redirect } from 'remix'
import type { LoaderFunction } from 'remix'

import { getAllPages, getPage } from '~/lib/api'
import { groq } from '~/lib/api/sanity'
import { getDoc } from '~/lib/api/sanity/queries'
import { i18next } from '~/lib/services/i18n.server'
import {
  getDefaultLanguage,
  localizeSlug,
  validateLanguage,
} from '~/lib/utils/i18n'
import { getDomainUrl } from '~/lib/utils/misc'
import { removeTrailingSlash } from '~/lib/utils/string'
import { Handle, PageType, RouteLoader, SanityPage } from '~/types'

export type LoaderData = RouteLoader<SanityPage>

const query = groq`${getDoc(PageType.page, true)}`

export const loader: LoaderFunction = async ({ request, params }) => {
  const lang = await i18next.getLocale(request)

  if (params.lang !== lang && lang !== getDefaultLanguage().code) {
    return redirect(`/${lang}/`)
  }

  const requestUrl = new URL(request.url)
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

  const [data, i18n] = await Promise.all([
    getPage({ slug, preview, lang }),
    i18next.getTranslations(request, ['common', 'basic-form']),
  ])

  // if there is no blogpost with the current settings, return a 404
  if (!data.page) {
    throw json('Page not found', { status: 404, headers })
  }

  if (!data.siteConfig?.site?.multilang && lang !== getDefaultLanguage().code) {
    throw json('Page not found', { status: 404, headers })
  }

  const canonical =
    data.page.seo?.canonical ??
    removeTrailingSlash(
      `${getDomainUrl(request)}${localizeSlug(data.page.slug || '', lang)}`,
    )

  return json<LoaderData>(
    {
      data: data.page,
      preview,
      canonical,
      query: preview ? query : ``,
      params: preview ? { slug, lang, type: PageType.page } : {},
      i18n,
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
