import {ThemeProvider as DarenThemeProvider} from '@daren/theme'
import darenStyles from '@daren/theme/dist/darenui.css'
import {cx} from '@daren/ui-components'
import type {LoaderArgs, MetaFunction} from '@remix-run/node'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react'
import {DynamicLinks} from 'remix-utils'

import {PreventFlashOnWrongTheme, useTheme} from '~/context/theme-provider'
import {getThemeSession} from '~/lib/services/theme.server'
import appStyles from '~/styles/app.css'
import componentStyles from '~/styles/components.css'
import proseStyles from '~/styles/prose.css'
import tailwindStyles from '~/styles/tailwind.css'

import {Footer} from './components/layout/footer'
import {Navigation} from './components/layout/navigation'
import {GlobalProvider} from './context/global-provider'
import {ThemeProvider} from './context/theme-provider'
import {getGlobalData} from './lib/services/content.server'
import {getEnv} from './lib/utils/env.server'

export async function loader({request}: LoaderArgs) {
  const [globalData, {getTheme}] = await Promise.all([
    getGlobalData(),
    getThemeSession(request),
  ])

  return {
    globalData,
    theme: getTheme(),
    ENV: getEnv(),
  }
}

const fonts = [
  '/fonts/inter/inter-regular.woff2',
  '/fonts/inter/inter-bold.woff2',
  '/fonts/inter/inter-black.woff2',
]

export function links() {
  // TODO: update site manifest
  // TODO: update favicon
  // Generate favicon with https://realfavicongenerator.net/
  return [
    {
      rel: 'manifest',
      href: '/site.webmanifest',
    },
    {
      rel: 'icon',
      href: '/favicon.ico',
      sizes: 'any',
    },
    {
      rel: 'apple-touch-icon',
      href: '/apple-touch-icon.png',
    },
    ...fonts.map((href: string) => ({
      rel: 'preload',
      as: 'font',
      href,
      type: 'font/woff2',
      // this is giving an typescript error, but why?? Hence the as any
      crossOrigin: 'anonymous' as any,
    })),
    {rel: 'stylesheet', href: darenStyles},
    {rel: 'stylesheet', href: appStyles},
    {rel: 'stylesheet', href: proseStyles},
    {rel: 'stylesheet', href: tailwindStyles},
    {rel: 'stylesheet', href: componentStyles},
  ]
}

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  viewport: 'width=device-width,initial-scale=1',
})

function App() {
  const data = useLoaderData<typeof loader>()
  const [theme] = useTheme()

  return (
    <html lang="en" className={cx(theme)}>
      <head>
        <Meta />
        <DynamicLinks />
        <Links />
        <PreventFlashOnWrongTheme ssrTheme={Boolean(data.theme)} />
      </head>
      <body>
        <Navigation />
        <Outlet />
        <Footer />

        <ScrollRestoration />
        <Scripts />
        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(data.ENV)};`,
          }}
        />
        {ENV.NODE_ENV === 'development' ? <LiveReload /> : null}
      </body>
    </html>
  )
}

export default function AppWithProviders() {
  const data = useLoaderData<typeof loader>()

  return (
    <ThemeProvider specifiedTheme={data.theme}>
      <DarenThemeProvider>
        <GlobalProvider
          navigation={data.globalData?.navigation}
          paths={data.globalData?.paths}
        >
          <App />
        </GlobalProvider>
      </DarenThemeProvider>
    </ThemeProvider>
  )
}
