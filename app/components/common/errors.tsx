import { Grid, H1, H2, H6, Paragraph } from '@daren/ui-components'
import {
  BookmarkAltIcon,
  ChevronRightIcon,
  RssIcon,
} from '@heroicons/react/solid'
import clsx from 'clsx'
import errorStack from 'error-stack-parser'
import * as React from 'react'
import { useTranslation } from 'react-i18next'
import { useMatches } from 'remix'

import { ArrowLink } from '../buttons'
import { OptimizedImage } from '../elements'
import { Container } from '../layout'

import notFoundImage from '~/assets/images/cat-on-box.png'

function RedBox({ error }: { error: Error }) {
  const [isVisible, setIsVisible] = React.useState(true)
  const frames = errorStack.parse(error)

  return (
    <div
      className={clsx(
        'flex fixed inset-0 z-10 justify-center items-center transition',
        {
          'opacity-0 pointer-events-none': !isVisible,
        },
      )}
    >
      <button
        className="block absolute inset-0 w-full h-full bg-black opacity-75"
        onClick={() => setIsVisible(false)}
      />
      <div className="overflow-y-auto relative p-12 my-16 mx-5vw bg-danger-100 rounded-lg prose-2xl prose-white border-lg max-h-75vh text-primary">
        <H2>{error.message}</H2>
        <div>
          {frames.map(frame => (
            <div
              key={[frame.fileName, frame.lineNumber, frame.columnNumber].join(
                '-',
              )}
              className="pt-4"
            >
              <H6 as="div" className="pt-2">
                {frame.functionName}
              </H6>
              <div className="font-mono opacity-75">
                {frame.fileName}:{frame.lineNumber}:{frame.columnNumber}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function ErrorPage({
  error,
  title,
  subTitle,
  image,
}: {
  error?: Error
  title?: string
  subTitle?: string
  image?: string
}) {
  const { t, i18n } = useTranslation()

  const links = [
    {
      title: t('errors.not-found.popular-pages.blog.title'),
      description: t('errors.not-found.popular-pages.blog.description'),
      icon: RssIcon,
      href: `${i18n.language}/blog`,
    },
    {
      title: t('errors.not-found.popular-pages.contact.title'),
      description: t('errors.not-found.popular-pages.contact.description'),
      icon: BookmarkAltIcon,
      href: `${i18n.language}/contact`,
    },
  ]

  return (
    <main className="relative">
      {error && process.env.NODE_ENV === 'development' ? (
        <RedBox error={error} />
      ) : null}
      <Grid>
        <Container size="full">
          <div className="relative pt-6 pb-8 w-full text-center lg:py-8 lg:text-left">
            <div className="flex flex-col flex-auto justify-start lg:w-1/2 xl:pr-16">
              <div className="py-16 mx-auto max-w-xl sm:py-24">
                <div className="text-center lg:text-left">
                  <H1>{title}</H1>
                  <Paragraph className="mt-2 text-lg text-secondary">
                    {subTitle}
                  </Paragraph>
                </div>
                <div className="mt-12">
                  <h2 className="text-sm font-semibold tracking-wide uppercase text-secondary">
                    {t('errors.not-found.popular-pages.title')}
                  </h2>
                  <ul className="mt-4 border-y border-gray-200 divide-y divide-gray-200">
                    {links.map((link, i) => (
                      <li
                        key={i}
                        className="group flex relative items-start py-6 space-x-4"
                      >
                        <div className="shrink-0">
                          <span className="flex justify-center items-center w-12 h-12 rounded-lg bg-inverse">
                            <link.icon
                              className="w-6 h-6 text-inverse"
                              aria-hidden="true"
                            />
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-base font-medium text-primary">
                            <span className="rounded-sm focus-within:ring-2 focus-within:ring-accent focus-within:ring-offset-2">
                              <a
                                href={link.href}
                                className="focus:outline-none"
                              >
                                <span
                                  className="absolute inset-0"
                                  aria-hidden="true"
                                />
                                {link.title}
                              </a>
                            </span>
                          </h3>
                          <p className="text-base text-secondary">
                            {link.description}
                          </p>
                        </div>
                        <div className="shrink-0 self-center">
                          <ChevronRightIcon
                            className="w-5 h-5 text-gray-400"
                            aria-hidden="true"
                          />
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8">
                    <ArrowLink href={`/${i18n.language}`}>
                      {t('errors.not-found.back-button')}
                    </ArrowLink>
                  </div>
                </div>
              </div>
            </div>
            {image && (
              <div className="flex relative items-center mx-auto w-full sm:w-72 md:h-96 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 lg:h-full">
                <OptimizedImage
                  className="mx-auto w-full max-w-96"
                  src={image}
                  alt="not found"
                />
              </div>
            )}
          </div>
        </Container>
      </Grid>
    </main>
  )
}

function FourOhFour({
  image,
  title,
  subTitle,
}: {
  title?: string
  subTitle?: string
  image?: string
}) {
  const { t } = useTranslation()
  const matches = useMatches()
  const last = matches[matches.length - 1]
  const pathname = last?.pathname

  return (
    <ErrorPage
      title={title || t('errors.not-found.title')}
      subTitle={subTitle || `${pathname} ${t('errors.not-found.message')}`}
      image={image || notFoundImage}
    />
  )
}

function ServerError({ error }: { error?: Error }) {
  const matches = useMatches()
  const last = matches[matches.length - 1]
  const pathname = last?.pathname
  const { t } = useTranslation()

  return (
    <ErrorPage
      error={error}
      title={t('errors.server-error.title')}
      subTitle={`${pathname} ${t('errors.server-error.message')}`}
    />
  )
}

export { FourOhFour, ServerError }
