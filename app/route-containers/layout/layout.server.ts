import { json } from 'remix'
import type { LoaderFunction } from 'remix'

import type { Theme } from '~/context/theme-provider'
import { getSiteInfo } from '~/lib/api'
import { pathedRoutes } from '~/other-routes.server'
import { getSession } from '~/session.server'
import { getThemeSession } from '~/theme.server'
import {
  getTranslations,
  PickTranslations,
  translations as allTranslations,
  Translations,
} from '~/translations.server'
import type { LanguageCode, SiteInfo } from '~/types'
import { ENV, getEnv } from '~/utils/get-env'
import { getDomainUrl } from '~/utils/misc'

export type LoaderData = {
  lang: LanguageCode
  translations?: PickTranslations<keyof Translations>
  siteInfo?: SiteInfo
  ENV: ENV
  theme: Theme | null
  requestInfo: {
    origin: string
    path: string
  }
}

export const loader: LoaderFunction = async ({ request, params }) => {
  // because this is called for every route, we'll do an early return for anything
  // that has a other route setup. The response will be handled there.
  if (pathedRoutes[new URL(request.url).pathname]) {
    return new Response()
  }
  const ENV = getEnv()
  const session = await getSession(request, params)
  const { getTheme } = await getThemeSession(request)
  const lang = session.getLanguage()

  const siteInfo = await getSiteInfo({ lang })

  const translations = getTranslations(
    lang,
    Object.keys(allTranslations) as (keyof Translations)[],
  )

  return json<LoaderData>({
    lang,
    translations,
    siteInfo,
    ENV,
    theme: getTheme(),
    requestInfo: {
      origin: getDomainUrl(request),
      path: new URL(request.url).pathname,
    },
  })
}
