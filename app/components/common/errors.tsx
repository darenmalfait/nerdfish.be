import { H2, H6 } from '@daren/ui-components'
import clsx from 'clsx'
import errorStack from 'error-stack-parser'
import * as React from 'react'
import { useMatches } from 'remix'

import { Hero, HeroProps } from '../layout'

import notFoundImage from '~/assets/images/cat-on-box.png'
import { useTranslations } from '~/context/translations-provider'

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
  heroProps,
}: {
  error?: Error
  heroProps: HeroProps
}) {
  return (
    <main className="relative">
      {error && process.env.NODE_ENV === 'development' ? (
        <RedBox error={error} />
      ) : null}
      <Hero {...heroProps} />
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
  const { t } = useTranslations()
  const matches = useMatches()
  const last = matches[matches.length - 1]
  const pathname = last?.pathname

  return (
    <ErrorPage
      heroProps={{
        title: title || t('not-found'),
        subTitle: subTitle || `"${pathname}" ${t('not-found-message')}`,
        image: image || notFoundImage,
      }}
    />
  )
}

function ServerError({ error }: { error?: Error }) {
  const matches = useMatches()
  const last = matches[matches.length - 1]
  const pathname = last?.pathname

  return (
    <ErrorPage
      error={error}
      heroProps={{
        title: '500 - Oh no, something went wrong!',
        subTitle: `"${pathname}" is currently not available.`,
      }}
    />
  )
}

export { FourOhFour, ServerError }
