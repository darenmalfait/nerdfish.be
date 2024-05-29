'use client'

import * as React from 'react'

import {Footer} from './footer'
import {Header} from './header'

export function BaseLayoutTemplate({children}: {children: React.ReactNode}) {
  return (
    <div className="bg-inverted dark:bg-muted">
      <header>
        <div className="absolute inset-x-0 top-2 z-40 pt-14">
          <Header />
        </div>
      </header>

      <div className="relative flex flex-auto overflow-hidden rounded-t-3xl bg-primary pt-14">
        <div className="relative isolate flex w-full flex-col pt-24">
          <main className="w-full flex-auto">{children}</main>

          <Footer />
        </div>
      </div>
    </div>
  )
}
