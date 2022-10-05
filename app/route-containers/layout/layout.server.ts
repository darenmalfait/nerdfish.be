import { json, LoaderArgs, createCookie, redirect } from '@remix-run/node'

import { getSiteInfo } from '~/lib/api'
import { i18n } from '~/lib/services/i18n.server'
import { getThemeSession } from '~/lib/services/theme.server'
import { getEnv } from '~/lib/utils/get-env'
import { getDefaultLanguage } from '~/lib/utils/i18n'
import { getDomainUrl } from '~/lib/utils/misc'
import { pathedRoutes } from '~/other-routes.server'

export async function loader({ request }: LoaderArgs) {
  // because this is called for every route, we'll do an early return for anything
  // that has a other route setup. The response will be handled there.
  if (pathedRoutes[new URL(request.url).pathname]) {
    return new Response()
  }

  const ENV = getEnv()

  const [{ getTheme }, locale] = await Promise.all([
    getThemeSession(request),
    i18n.getLocale(request),
  ])

  const siteInfo = await getSiteInfo({ lang: locale })

  if (!siteInfo.site?.multilang && locale !== getDefaultLanguage().code) {
    return redirect('/', {
      headers: {
        'Set-Cookie': await createCookie('language').serialize(
          getDefaultLanguage().code,
        ),
      },
    })
  }

  return json({
    locale,
    siteInfo,
    ENV,
    theme: getTheme(),
    requestInfo: {
      origin: getDomainUrl(request),
      path: new URL(request.url).pathname,
    },
  })
}

type LoaderType = typeof loader

export type { LoaderType }
