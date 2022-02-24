import { redirect } from 'remix'
import type { ActionFunction, LoaderFunction } from 'remix'

import { validateLanguage } from '~/lib/utils/i18n'
import { getSession } from '~/lib/utils/session.server'

export const action: ActionFunction = async ({ request, params }) => {
  const [session, body] = await Promise.all([
    getSession(request, params),
    request.text(),
  ])

  const formData = new URLSearchParams(body)
  const lang = formData.get('lang')
  let redirectTo = formData.get('redirect')

  if (!redirectTo?.startsWith('/')) {
    redirectTo = '/'
  }

  if (validateLanguage(lang)) {
    session.setLanguage(lang)

    const [, urlLang] = redirectTo.split('/', 2)
    if (validateLanguage(urlLang)) {
      redirectTo = redirectTo.replace(`/${urlLang}`, `/${lang}`)
    } else {
      redirectTo = `/${lang}${redirectTo}`
    }
  }

  return redirect(redirectTo, {
    headers: {
      'Set-Cookie': await session.commitSession(),
    },
  })
}

export const loader: LoaderFunction = () => {
  return redirect('/')
}
