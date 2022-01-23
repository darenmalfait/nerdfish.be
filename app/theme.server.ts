import { createCookieSessionStorage } from 'remix'

import { isTheme, Theme } from './context/theme-provider'

const sessionSecret = process.env.ENCRYPTION_KEY

if (!sessionSecret) {
  throw new Error('ENCRYPTION_KEY must be set')
}

const themeStorage = createCookieSessionStorage({
  cookie: {
    name: 'theme_preference',
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
    // returns the current theme value stored in the cookie session (or “light” if it isn’t a valid value).
    getTheme: () => {
      const themeValue = session.get('theme')
      // if you want to set a default theme, you can do it here.
      return isTheme(themeValue) ? themeValue : null
    },
    // sets the current theme value in the cookie.
    setTheme: (theme: Theme) => session.set('theme', theme),
    // stores all the data in the Session and returns the Set-Cookie header. We’ll need this for our HTTP responses later.
    commit: () => themeStorage.commitSession(session),
  }
}

export { getThemeSession }
