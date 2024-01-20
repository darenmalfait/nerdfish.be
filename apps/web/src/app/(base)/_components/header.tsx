'use client'

import * as React from 'react'
import Link from 'next/link'
import {usePathname} from 'next/navigation'
import {stripPreSlash} from '@nerdfish-website/lib/utils'
import {Icons} from '@nerdfish-website/ui/icons'
import {Button, Container, getButtonClassName, Grid} from '@nerdfish/ui'
import {cx} from '@nerdfish/utils'

import {useGlobal} from '../global-provider'
import {Search} from './search'
import {ThemeToggle} from './theme-toggle'

export function Header({
  panelId,
  expanded,
  onToggle,
  toggleRef,
  invert,
}: {
  panelId: string
  expanded: boolean
  onToggle?: () => void
  toggleRef: React.RefObject<HTMLButtonElement>
  invert?: boolean
}) {
  const {navigation} = useGlobal()
  const pathname = usePathname()

  const buttonStyles = invert
    ? 'text-inverted dark:text-primary hover:bg-primary/20 dark:hover:bg-primary'
    : ''

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
                        'flex h-8 items-center cursor-pointer gap-x-1.5 rounded-full px-3 transition sm:h-10 sm:px-4 active:bg-inverted/10',
                        isActive
                          ? 'flex h-8 items-center gap-x-1.5 rounded-full bg-primary px-3 text-primary transition shadow-outline hover:text-primary/90 hover:bg-muted sm:h-10 sm:px-4'
                          : 'hover:bg-muted',
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
            <Search className={buttonStyles} />
            <ThemeToggle variant="ghost" className={buttonStyles} />
            <a
              className={getButtonClassName({
                variant: 'ghost',
                size: 'icon',
                className: `hidden xsm:flex active-ring ${buttonStyles}`,
              })}
              target="_blank"
              href="/rss.xml"
              aria-label="rss feed"
              rel="noreferrer"
            >
              <span className="sr-only">RSS feed</span>
              <Icons.Rss className="size-4" />
            </a>
            <div className="hidden space-x-3 sm:flex">
              {navigation?.actions?.map((link, i: number) => {
                if (!link) return null

                return (
                  <Link
                    className={getButtonClassName({
                      variant: 'default',
                      className: invert
                        ? 'bg-white text-black hover:bg-white/90 hover:text-black'
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
              className={cx('group', buttonStyles)}
              aria-label="Toggle navigation"
            >
              <Icons.Hamburger className="size-4" />
            </Button>
          </div>
        </div>
      </Container>
    </Grid>
  )
}
