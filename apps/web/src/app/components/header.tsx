'use client'

import * as React from 'react'
import Link from 'next/link'
import {Icons} from '@nerdfish-website/ui/icons'

import {MobileNavigation} from './mobile-navigation'
import {ActionsNavigation, MainNavigation, RSSFeedButton} from './navigation'
import {ThemeToggle} from './theme-toggle'

export function Header() {
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
            <MainNavigation />
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
