import type { Params } from 'react-router-dom'
import { createCookieSessionStorage } from 'remix'

import { getDefaultLanguage, validateLanguage } from './i18n'

import type { LanguageCode } from '~/types'

if (!process.env.ENCRYPTION_KEY) {
  throw new Error('ENCRYPTION_KEY environment variable is not set')
}

const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: 'session',
    httpOnly: true,
    path: '/',
    sameSite: 'lax',
    secrets: [process.env.ENCRYPTION_KEY],
  },
})

const langSessionKey = 'language'

export async function getSession(
  input: Request | string | null | undefined,
  params: Params,
) {
  const cookieHeader =
    !input || typeof input === 'string' ? input : input.headers.get('Cookie')
  const session = await sessionStorage.getSession(cookieHeader)

  return {
    commitSession() {
      return sessionStorage.commitSession(session)
    },
    getLanguage(): LanguageCode {
      if (params.lang && validateLanguage(params.lang)) {
        return params.lang
      }

      return session.get(langSessionKey) || getDefaultLanguage().code
    },
    setLanguage(language: LanguageCode) {
      session.set(langSessionKey, language)
    },
  }
}
