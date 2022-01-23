import * as React from 'react'
import { Link } from 'remix'

import { CtaLink } from '../buttons'

import { LanguageSelector } from '../common/language-selector'

import { GithubIcon } from '../icons/github-icon'

import { TwitterIcon } from '../icons/twitter-icon'

import { Disclaimer, Logo } from '~/components/common'
import { useTranslations } from '~/context/translations-provider'
import type { SanitySocial, SiteNavigation } from '~/types'
import { localizeSlug } from '~/utils/i18n'

interface FooterProps {
  multilang?: boolean
  company?: string
  navigation?: SiteNavigation
  socials?: SanitySocial[]
}

function Footer({ multilang, company, navigation, socials }: FooterProps) {
  const { currentLanguage } = useTranslations()
  const root = localizeSlug('home', currentLanguage)

  const items = [
    ...(navigation?.main?.items || []),
    ...(navigation?.actions?.items || []),
    ...(navigation?.footer?.items || []),
  ]

  const github = socials?.find(({ name }) => name === 'github')
  const twitter = socials?.find(({ name }) => name === 'twitter')

  return (
    <footer className="px-5vw mt-32">
      <div className="py-24 mx-auto max-w-8xl border-t border-gray-300 dark:border-gray-700">
        <div>
          <Link
            className="flex flex-initial items-center font-bold md:mr-24"
            to={root}
          >
            <Logo className="w-14 h-14" />
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-8 py-12 border-primary-100 transition-colors duration-150 lg:grid-cols-12 bg-primary text-primary">
          <div className="col-span-8">
            <div>
              {items.map(item => (
                <CtaLink
                  key={item.title}
                  {...item}
                  className="inline-block mr-8 text-lg"
                  kind="link"
                />
              ))}
              <div className="mt-24">
                <Disclaimer companyName={company || ''} />
              </div>
            </div>
          </div>
          <div className="flex col-span-2 items-start lg:col-span-4 lg:justify-end text-primary">
            <div className="flex items-center space-x-4 h-10">
              {twitter && (
                <a
                  rel="noreferrer noopener"
                  aria-label="Twitter feed"
                  target="_blank"
                  href={twitter.link}
                >
                  <TwitterIcon className="duration-75 ease-linear hover:scale-110" />
                </a>
              )}
              {github && (
                <a
                  rel="noreferrer noopener"
                  aria-label="Github Repository"
                  target="_blank"
                  href={github.link}
                >
                  <GithubIcon className="duration-75 ease-linear hover:scale-110" />
                </a>
              )}
              {multilang && (
                <div>
                  <LanguageSelector />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export { Footer }
