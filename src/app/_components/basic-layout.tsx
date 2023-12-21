'use client'

import * as React from 'react'
import Link from 'next/link'
import {usePathname} from 'next/navigation'
import {Button, Container, getButtonClassName, Grid} from '@nerdfish/ui'
import {cx} from '@nerdfish/utils'
import {motion, MotionConfig, useReducedMotion} from 'framer-motion'
import {Rss} from 'lucide-react'

import {Search} from '~/components/common/search'
import {ThemeToggle} from '~/components/common/theme-toggle'
import {Logo} from '~/components/icons/logo'
import {stripPreSlash} from '~/lib/utils/string'
import {type Global} from '~/tina/__generated__/types'

import {GlobalProvider, useGlobal} from '../global-provider'
import {Footer} from './footer'

function MenuIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M2 6h20v2H2zM2 16h20v2H2z" />
    </svg>
  )
}

function Header({
  panelId,
  expanded,
  onToggle,
  toggleRef,
  invert = false,
}: {
  panelId: string
  expanded: boolean
  onToggle: () => void
  toggleRef: React.RefObject<HTMLButtonElement>
  invert?: boolean
}) {
  const {navigation} = useGlobal()
  const pathname = usePathname() ?? '/'

  return (
    <Grid className="mx-auto text-primary">
      <Container size="full">
        <div className="relative flex items-center gap-4">
          <div className="flex flex-1">
            <Link href="/" aria-label="Home">
              <Logo className="h-5 w-auto transition-transform hover:scale-105" />
            </Link>
          </div>
          {!expanded ? (
            <div className="hidden flex-1 justify-end md:justify-center lg:flex">
              <nav className="flex rounded-full px-3 text-sm font-medium lg:space-x-2">
                {navigation?.main?.map((link, i: number) => {
                  if (!link) return null
                  const isActive = stripPreSlash(pathname).startsWith(link.href)

                  return (
                    <Link
                      key={i}
                      className={cx(
                        'flex h-8 items-center cursor-pointer gap-x-1.5 rounded-full px-3 transition sm:h-10 sm:px-4 dark:hover:bg-white/10 hover:bg-black/5',
                        {
                          'flex h-8 items-center gap-x-1.5 rounded-full bg-gray-50 px-3 text-black/80 !text-black transition shadow-outline hover:bg-gray-50 hover:text-black/90 hover:!bg-secondary  dark:bg-black/50 dark:text-white/70 dark:!text-white   dark:hover:text-white/90 sm:h-10 sm:px-4':
                            isActive,
                        },
                      )}
                      href={`/${stripPreSlash(link.href)}`}
                    >
                      {link.label}
                    </Link>
                  )
                })}
              </nav>
            </div>
          ) : null}
          <div className="flex justify-end space-x-2 md:flex-1">
            <Search
              className={invert ? '!text-gray-100 hover:!bg-white/10' : ''}
            />
            <ThemeToggle
              variant="ghost"
              className={invert ? '!text-gray-100 hover:!bg-white/10' : ''}
            />
            <a
              className={getButtonClassName({
                variant: 'ghost',
                size: 'icon',
                className: cx(
                  'hidden xsm:flex active-ring',
                  invert && '!text-gray-100 hover:!bg-white/10',
                ),
              })}
              target="_blank"
              href="/rss.xml"
              aria-label="rss feed"
              rel="noreferrer"
            >
              <span className="sr-only">RSS feed</span>
              <Rss className="h-4 w-4" />
            </a>
            <div className="hidden space-x-3 sm:flex">
              {navigation?.actions?.map((link, i: number) => {
                if (!link) return null

                return (
                  <Link
                    className={getButtonClassName({
                      variant: invert ? 'secondary' : 'default',
                      className: invert
                        ? 'dark:!bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-300'
                        : '',
                    })}
                    key={i}
                    href={`/${stripPreSlash(link.href)}`}
                  >
                    {link.label}
                  </Link>
                )
              })}
            </div>
            <Button
              variant="ghost"
              ref={toggleRef}
              type="button"
              size="icon"
              onClick={onToggle}
              aria-expanded={expanded ? 'true' : 'false'}
              aria-controls={panelId}
              className={cx(
                'group',
                invert ? 'hover:!bg-white/10' : 'hover:bg-gray-900/10',
              )}
              aria-label="Toggle navigation"
            >
              <MenuIcon
                className={cx(
                  'h-4 w-4',
                  invert
                    ? 'fill-white group-hover:fill-gray-200'
                    : 'fill-gray-900 group-hover:fill-gray-700 dark:fill-white dark:group-hover:fill-gray-100',
                )}
              />
            </Button>
          </div>
        </div>
      </Container>
    </Grid>
  )
}

function NavigationRow({children}: {children: React.ReactNode}) {
  return (
    <Grid className="even:mt-px dark:bg-gray-800 sm:bg-gray-900">
      <Container size="full">
        <div className="grid grid-cols-1 sm:grid-cols-2">{children}</div>
      </Container>
    </Grid>
  )
}

function NavigationItem({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  return (
    <Link
      href={`/${stripPreSlash(href)}`}
      className="group relative isolate -mx-6 bg-gray-900 px-6 py-10 text-gray-100 even:mt-px dark:bg-gray-800 sm:mx-0 sm:px-0 sm:py-16 sm:odd:pr-16 sm:even:mt-0 sm:even:border-l sm:even:border-white/20 sm:even:pl-16"
    >
      {children}
      <span className="absolute inset-y-0 -z-10 w-screen rounded-md bg-white/5 opacity-0 transition group-odd:right-0 group-even:left-0 group-hover:opacity-100" />
    </Link>
  )
}

function NavigationGrid() {
  const {navigation} = useGlobal()

  const navigationGroups = React.useMemo(() => {
    const items = navigation?.main ?? []

    // group items per 2 in a new array
    const rows = []
    for (let i = 0; i < items.length; i += 2) {
      rows.push(items.slice(i, i + 2))
    }

    return rows
  }, [navigation?.main])
  return (
    <nav className="font-display mt-px text-5xl font-medium tracking-tight text-white dark:text-black">
      {navigationGroups.map((row, i) => (
        <NavigationRow key={i}>
          {row.map((link, j) => {
            if (!link) return null
            return (
              <NavigationItem key={j} href={link.href}>
                {link.label}
              </NavigationItem>
            )
          })}
        </NavigationRow>
      ))}
    </nav>
  )
}

export function BasicLayout({
  globalData,
  children,
  forceTheme,
}: {
  globalData?: Partial<Global> | any
  children: React.ReactNode
  navigationClassName?: string
  forceTheme?: 'light' | 'dark'
}) {
  const panelId = React.useId()
  const [expanded, setExpanded] = React.useState(false)
  const openRef = React.useRef<React.ElementRef<'button'>>(null)
  const closeRef = React.useRef<React.ElementRef<'button'>>(null)
  const navRef = React.useRef<React.ElementRef<'div'>>(null)
  const shouldReduceMotion = useReducedMotion()

  return (
    <MotionConfig transition={shouldReduceMotion ? {duration: 0} : undefined}>
      <GlobalProvider {...globalData}>
        <div className={cx(forceTheme)}>
          <div className="bg-gray-900 dark:bg-gray-800">
            <header>
              <div
                className="absolute inset-x-0 top-2 z-40 pt-14"
                aria-hidden={expanded ? 'true' : undefined}
                // @ts-expect-error (https://github.com/facebook/react/issues/17157)
                inert={expanded ? '' : undefined}
              >
                <Header
                  panelId={panelId}
                  toggleRef={openRef}
                  expanded={expanded}
                  onToggle={() => {
                    setExpanded(value => !value)
                    window.setTimeout(
                      () => closeRef.current?.focus({preventScroll: true}),
                    )
                  }}
                />
              </div>

              <motion.div
                layout
                id={panelId}
                style={{height: expanded ? 'auto' : '0.5rem'}}
                className="relative z-50 overflow-hidden bg-gray-900 pt-2 dark:bg-gray-800"
                aria-hidden={expanded ? undefined : 'true'}
                // @ts-expect-error (https://github.com/facebook/react/issues/17157)
                inert={expanded ? undefined : ''}
              >
                <motion.div layout className="bg-gray-900 dark:bg-gray-800">
                  <div ref={navRef} className="pb-16 pt-14">
                    <Header
                      invert
                      panelId={panelId}
                      toggleRef={closeRef}
                      expanded={expanded}
                      onToggle={() => {
                        setExpanded(value => !value)
                        window.setTimeout(
                          () => openRef.current?.focus({preventScroll: true}),
                        )
                      }}
                    />
                  </div>
                  <NavigationGrid />
                  <div className="pb-12" />
                </motion.div>
              </motion.div>
            </header>

            <motion.div
              layout
              className="relative flex flex-auto overflow-hidden rounded-3xl pt-14 bg-primary"
            >
              <motion.div
                layout
                className="relative isolate flex w-full flex-col pt-24"
              >
                <main className="w-full flex-auto">{children}</main>

                <Footer />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </GlobalProvider>
    </MotionConfig>
  )
}
