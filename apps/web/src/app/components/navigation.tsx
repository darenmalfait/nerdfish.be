'use client'

import * as React from 'react'
import Link from 'next/link'
import {stripPreSlash} from '@nerdfish-website/lib/utils'

import {useGlobal} from '../global-provider'

function NavigationRow({children}: {children: React.ReactNode}) {
  return (
    <div className="container mx-auto px-2 even:mt-px dark:bg-muted sm:bg-inverted">
      <div className="grid grid-cols-1 sm:grid-cols-2">{children}</div>
    </div>
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
      className="group relative isolate rounded-md bg-inverted !px-6 py-10 text-inverted even:mt-px hover:bg-white/10 dark:bg-muted dark:text-primary dark:hover:bg-black/10 md:mx-0 md:px-0 md:py-16 md:odd:pr-16 md:even:mt-0 md:even:border-l md:even:border-primary/20"
    >
      {children}
    </Link>
  )
}

export function NavigationGrid() {
  const {navigation} = useGlobal()

  const navigationGroups = React.useMemo(() => {
    const items = navigation?.main ?? []

    // group items per 2 in a new array
    const rows: Array<Array<(typeof items)[number]>> = []
    for (let i = 0; i < items.length; i += 2) {
      rows.push(items.slice(i, i + 2))
    }

    return rows
  }, [navigation?.main])
  return (
    <nav className="font-display mt-px text-5xl font-medium tracking-tight text-inverted">
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
