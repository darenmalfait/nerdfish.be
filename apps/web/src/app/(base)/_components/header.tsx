'use client'

import * as React from 'react'
import Link from 'next/link'
import {usePathname} from 'next/navigation'
import {stripPreSlash} from '@nerdfish-website/lib/utils'
import {Icons} from '@nerdfish-website/ui/icons'
import {Button, Container, getButtonClassName, Grid} from '@nerdfish/ui'
import {cx} from '@nerdfish/utils'
import {Rss} from 'lucide-react'

import {useGlobal} from '../global-provider'
import {Search} from './search'
import {ThemeToggle} from './theme-toggle'

export function Header({
  panelId,
  expanded,
  onToggle,
  toggleRef,
  invert = false,
}: {
  panelId: string
  expanded: boolean
  onToggle?: () => void
  toggleRef: React.RefObject<HTMLButtonElement>
  invert?: boolean
}) {
  const {navigation} = useGlobal()
  const pathname = usePathname()

  return (
    <Grid className="mx-auto text-primary">
      <Container size="full">
        <div className="relative flex items-center gap-4">
          <div className="flex flex-1">
            <Link href="/" aria-label="Home">
              <Icons.Logo className="h-5 w-auto transition-transform hover:scale-105" />
            </Link>
          </div>
          {!expanded ? (
            <div className="hidden flex-1 justify-end md:justify-center lg:flex">
              <nav className="flex rounded-full px-3 text-sm font-medium lg:space-x-2">
                {navigation?.main?.map((link, i: number) => {
                  if (!link) return null
                  const isActive = stripPreSlash(pathname ?? '').startsWith(
                    link.href,
                  )

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
              <Icons.Hamburger
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
