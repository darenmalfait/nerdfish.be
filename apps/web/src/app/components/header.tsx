'use client'

import * as React from 'react'
import Link from 'next/link'
import {usePathname} from 'next/navigation'
import {stripPreSlash} from '@nerdfish-website/lib/utils'
import {Icons} from '@nerdfish-website/ui/icons'
import {cx} from '@nerdfish/utils'

import {useGlobal} from '../global-provider'
import {ActionsNavigation, MobileNavigation, RSSFeedButton} from './navigation'
import {ThemeToggle} from './theme-toggle'

export function Header() {
  const {navigation} = useGlobal()
  const pathname = usePathname()

  return (
    <div className="container mx-auto px-4">
      <div className="relative flex items-center gap-4">
        <div className="flex flex-1">
          <Link href="/" aria-label="Home">
            <Icons.Logo className="h-5 w-auto transition-transform hover:scale-105" />
          </Link>
        </div>
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
                    'flex h-8 items-center cursor-pointer gap-x-1.5 active-ring !ring-muted rounded-full px-3 transition sm:h-10 sm:px-4 active:bg-inverted/10',
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
        <div className="flex justify-end space-x-2 md:flex-1">
          <ThemeToggle variant="ghost" />
          <RSSFeedButton className="hidden xsm:flex" />
          <ActionsNavigation className="hidden md:flex" />
          <MobileNavigation />
        </div>
      </div>
    </div>
  )
}
