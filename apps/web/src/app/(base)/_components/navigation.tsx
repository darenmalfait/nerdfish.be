'use client'

import * as React from 'react'
import Link from 'next/link'
import {stripPreSlash} from '@nerdfish-website/lib/utils'
import {Container, Grid} from '@nerdfish/ui'

import {useGlobal} from '../global-provider'

function NavigationRow({children}: {children: React.ReactNode}) {
  return (
    <Grid className="even:mt-px sm:bg-gray-900 dark:bg-gray-800">
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
      className="group relative isolate -mx-6 bg-gray-900 px-6 py-10 text-gray-100 even:mt-px sm:mx-0 sm:px-0 sm:py-16 sm:odd:pr-16 sm:even:mt-0 sm:even:border-l sm:even:border-white/20 sm:even:pl-16 dark:bg-gray-800"
    >
      {children}
      <span className="absolute inset-y-0 -z-10 w-screen rounded-md bg-white/5 opacity-0 transition group-odd:right-0 group-even:left-0 group-hover:opacity-100" />
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
