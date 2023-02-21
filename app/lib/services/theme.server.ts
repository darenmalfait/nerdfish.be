import {createCookieSessionStorage} from '@remix-run/node'

import {Theme, isTheme} from '~/context/theme-provider'

const sessionSecret = process.env.ENCRYPTION_KEY

if (!sessionSecret) {
  throw new Error('ENCRYPTION_KEY must be set')
}

const themeStorage = createCookieSessionStorage({
  cookie: {
    name: 'theme-preference',
    secure: true,
    secrets: [sessionSecret],
    sameSite: 'lax',
    path: '/',
    httpOnly: true,
  },
})

async function getThemeSession(request: Request) {
  const session = await themeStorage.getSession(request.headers.get('Cookie'))
  return {
    getTheme: () => {
      const themeValue = session.get('theme')
      return isTheme(themeValue) ? themeValue : null
    },
    setTheme: (theme: Theme) => session.set('theme', theme),
    commit: () => themeStorage.commitSession(session),
  }
}

export {getThemeSession}
