'use client'

import Link from 'next/link'
import {getButtonClassName} from '@nerdfish/ui'

import {ThemeToggle} from '~/components/common/theme-toggle'
import {GithubIcon} from '~/components/icons/github-icon'
import {Logo} from '~/components/icons/logo'
import {TwitterIcon} from '~/components/icons/twitter-icon'

import {useGlobal} from '../global-provider'

function Footer() {
  const {social} = useGlobal()

  const github = social?.github
  const twitter = social?.twitter

  return (
    <footer className="mt-24 px-5vw pb-8 text-primary md:pb-20">
      <div className="flex flex-col items-center justify-between gap-8 border-t border-gray-100 pt-8 dark:border-white/10 md:flex-row md:items-start md:pt-16">
        <div className="flex flex-col items-center justify-center gap-4 text-center md:flex-row md:items-start md:text-left">
          <div className="flex h-12 items-center">
            <Logo className="relative h-6 w-auto rounded-full border-2 border-white dark:border-[#111]" />
          </div>
          <div className="space-y-4 divide-y divide-gray-100 dark:divide-white/10">
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
        <div className="flex flex-row items-center gap-3 md:gap-7">
          <ThemeToggle className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-github/20" />

          {twitter ? (
            <Link
              className={getButtonClassName({
                variant: 'ghost',
                size: 'icon',
                className: 'active-ring cursor-pointer !hover:bg-twitter/20',
              })}
              aria-label="Twitter feed"
              href={twitter}
            >
              <TwitterIcon className="h-4 w-4 duration-75 ease-linear" />
            </Link>
          ) : null}
          {github ? (
            <Link
              className={getButtonClassName({
                variant: 'ghost',
                size: 'icon',
                className: 'active-ring cursor-pointer hover:bg-github/20',
              })}
              aria-label="Github Repository"
              href={github}
            >
              <GithubIcon className="h-4 w-4 duration-75 ease-linear" />
              <span className="sr-only">Github</span>
            </Link>
          ) : null}
        </div>
      </div>
    </footer>
  )
}

export {Footer}
