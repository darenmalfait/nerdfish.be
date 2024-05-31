'use client'

import * as React from 'react'
import Link from 'next/link'
import {Icons} from '@nerdfish-website/ui/icons'

import {useGlobal} from '../global-provider'
import {SocialLinks} from './navigation'
import {ThemeToggle} from './theme-toggle'

function Footer() {
  const {social} = useGlobal()

  const github = social?.github
  const twitter = social?.twitter

  return (
    <footer className="container mx-auto mt-24 px-4 text-primary md:pb-20">
      <div className="flex flex-col items-center justify-between gap-8 border-t border-primary/10 pt-8 md:flex-row md:items-start md:pt-16">
        <div className="flex flex-col items-center justify-center gap-4 text-center md:flex-row md:items-start md:text-left">
          <div className="flex h-12 items-center">
            <Icons.Logo className="relative h-6 w-auto rounded-full" />
          </div>
          <div className="space-y-4 divide-y divide-primary/10">
            <p className="max-w-md">
              <b className="font-semibold">
                Made by{' '}
                <Link
                  className="underline"
                  href={twitter ?? github ?? 'https://www.nerdfish.be'}
                >
                  nerdfish
                </Link>
              </b>
              , development with user experience in mind.
            </p>
          </div>
        </div>
        <div className="flex flex-row items-center gap-3">
          <ThemeToggle className="flex size-10 items-center justify-center transition" />

          <SocialLinks />
        </div>
      </div>
    </footer>
  )
}

export {Footer}
