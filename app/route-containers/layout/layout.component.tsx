import darenStyles from '@daren/theme/dist/darenui.css'
import clsx from 'clsx'
import {
  LazyMotion,
  domAnimation,
  AnimatePresence,
  motion,
} from 'framer-motion'
import * as React from 'react'
import type { ReactNode } from 'react'
import TagManager from 'react-gtm-module'
import {
  Links,
  LinksFunction,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  ShouldReloadFunction,
  useLoaderData,
  useMatches,
  useTransition,
} from 'remix'
import { useSpinDelay } from 'spin-delay'

import type { LoaderData } from './layout.server'

import { GenericCatchBoundary } from '../boundaries/generic-catch-boundary'

import { GenericErrorBoundary } from '../boundaries/generic-error-boundary'

import { NotificationMessage } from '~/components/common'
import { Cookiebar } from '~/components/common/cookiebar'
import { SpinnerIcon } from '~/components/icons/spinner-icon'
import { Footer, Navigation } from '~/components/layout'
import { AppProviders } from '~/context/app-providers'

import { PreventFlashOnWrongTheme, useTheme } from '~/context/theme-provider'
import { getDefaultLanguage } from '~/lib/utils/i18n'
import appStyles from '~/styles/app.css'
import globalStyles from '~/styles/global.css'
import proseStyles from '~/styles/prose.css'
import tailwindStyles from '~/styles/tailwind.css'
import vendorStyles from '~/styles/vendors.css'

/**
 * The `links` export is a function that returns an array of objects that map to
 * the attributes for an HTML `<link>` element. These will load `<link>` tags on
 * every route in the app, but individual routes can include their own links
 * that are automatically unloaded when a user navigates away from the route.
 *
 * https://remix.run/api/app#links
 */

const fonts = [
  '/fonts/inter/inter-regular.woff2',
  '/fonts/inter/inter-bold.woff2',
  '/fonts/inter/inter-black.woff2',
  '/fonts/lora/lora-regular.woff2',
]

export const links: LinksFunction = () => {
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
    { rel: 'stylesheet', href: globalStyles },
    { rel: 'stylesheet', href: darenStyles },
    { rel: 'stylesheet', href: appStyles },
    { rel: 'stylesheet', href: proseStyles },
    { rel: 'stylesheet', href: tailwindStyles },
    { rel: 'stylesheet', href: vendorStyles },
  ]
}

// unstable_shouldReload's api is temporary and will most likely change
// eslint-disable-next-line @typescript-eslint/naming-convention
export const unstable_shouldReload: ShouldReloadFunction = ({ submission }) => {
  return submission?.method.toLowerCase() === 'post'
}

const LOADER_WORDS = [
  'loading',
  'checking cdn',
  'checking cache',
  'fetching from db',
  'compiling mdx',
  'updating cache',
  'transfer',
]

const ACTION_WORDS = [
  'packaging',
  'zapping',
  'validating',
  'processing',
  'calculating',
  'computing',
  'computering',
]

let firstRender = true

function PageLoadingMessage() {
  const transition = useTransition()
  const [words, setWords] = React.useState<Array<string>>([])
  const [pendingPath, setPendingPath] = React.useState('')
  const showLoader = useSpinDelay(Boolean(transition.state !== 'idle'), {
    delay: 400,
    minDuration: 1000,
  })

  React.useEffect(() => {
    if (firstRender) return
    if (transition.state === 'idle') return
    if (transition.state === 'loading') setWords(LOADER_WORDS)
    if (transition.state === 'submitting') setWords(ACTION_WORDS)

    const interval = setInterval(() => {
      setWords(([first, ...rest]) => [...rest, first] as Array<string>)
    }, 2000)

    return () => clearInterval(interval)
  }, [pendingPath, transition.state])

  React.useEffect(() => {
    if (firstRender) return
    if (transition.state === 'idle') return
    setPendingPath(transition.location.pathname)
  }, [transition])

  React.useEffect(() => {
    firstRender = false
  }, [])

  const action = words[0]

  return (
    <NotificationMessage position="bottom-right" visible={showLoader}>
      <div className="flex items-center w-64">
        <div>
          <SpinnerIcon className="w-10 h-10" />
          {/* <TeamCircle size={48} team="UNKNOWN" /> */}
        </div>
        <div className="inline-grid ml-4">
          <AnimatePresence>
            <div className="flex overflow-hidden col-start-1 row-start-1">
              <motion.span
                key={action}
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -15, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="flex-none"
              >
                {action}
              </motion.span>
            </div>
          </AnimatePresence>
          <span className="truncate text-secondary">path: {pendingPath}</span>
        </div>
      </div>
    </NotificationMessage>
  )
}

export function Document({ children }: { children: ReactNode }) {
  const {
    lang = getDefaultLanguage().code,
    siteInfo,
    ENV,
    theme: ssrTheme,
  } = useLoaderData<LoaderData>()
  const [theme] = useTheme()

  const matches = useMatches()
  const match = matches.find(match => match.data && match.data.canonical)
  const canonical = match?.data.canonical

  React.useEffect(() => {
    if (ENV?.GTM_ID) {
      TagManager.initialize({ gtmId: ENV.GTM_ID })
    }
  }, [ENV?.GTM_ID])

  const isMultilang = siteInfo?.site?.multilang || false

  return (
    <html lang={lang} className={clsx(theme)}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        {!!canonical && <link rel="canonical" href={canonical} />}
        <Links />
        <PreventFlashOnWrongTheme ssrTheme={Boolean(ssrTheme)} />
      </head>
      <body className="flex flex-col min-h-screen bg-primary">
        <PageLoadingMessage />
        {/*  m is used in the exact same way as motion, but unlike motion, the m component doesn't come preloaded with features like exit animations or drag. Instead, we load these in manually via the LazyMotion component. This lets you choose which features you load in, and whether you load them synchronously or asynchronously. */}
        <LazyMotion features={domAnimation}>
          {siteInfo && (
            <>
              <Cookiebar {...siteInfo?.site?.cookieConsent} />
              <Navigation
                multilang={isMultilang}
                items={siteInfo?.navigation || {}}
              />
            </>
          )}
          {children}

          <Footer
            socials={siteInfo?.socials || []}
            navigation={siteInfo?.navigation || {}}
            company={siteInfo?.info?.name}
            multilang={isMultilang}
          />
        </LazyMotion>
        <ScrollRestoration />
        <Scripts />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(ENV)}`,
          }}
        />
        {process.env.NODE_ENV === 'development' && <LiveReload />}
      </body>
    </html>
  )
}

export function CatchBoundary() {
  return (
    <Document>
      <GenericCatchBoundary />
    </Document>
  )
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <Document>
      <GenericErrorBoundary error={error} />
    </Document>
  )
}

export default function Root() {
  const loaderData = useLoaderData<LoaderData>()

  return (
    <AppProviders {...loaderData}>
      <Document>
        <Outlet />
      </Document>
    </AppProviders>
  )
}
