import type { PortableTextEntry } from '@sanity/block-content-to-react'
import * as React from 'react'

import { Button } from '~/components/buttons'
import { PortableText } from '~/components/common/'
import { CookieIcon } from '~/components/icons/cookie-icon'
import { useTranslations } from '~/context/translations-provider'

interface CookiebarBasicProps {
  onCustomize?(): void
  onAccept?(): void
  message?: PortableTextEntry[]
}

function CookiebarBasic({
  onCustomize,
  onAccept,
  message,
}: CookiebarBasicProps) {
  const { t } = useTranslations()

  return (
    <div className="flex flex-col items-center space-y-4 text-center md:flex-row md:space-y-0 md:space-x-8 md:text-left">
      <div className="w-full max-w-[30px] text-center">
        <CookieIcon className="w-8 h-8" />
      </div>
      {message && <PortableText blocks={message} />}
      <div className="flex flex-col space-y-4 w-full md:flex-row md:justify-end md:space-y-0 md:space-x-2 md:w-full md:max-w-[300px]">
        <Button onClick={onCustomize} variant="secondary" size="small">
          {t('cookies-customize-title')}
        </Button>
        <Button onClick={onAccept} size="small">
          {t('accept-all-cookies')}
        </Button>
      </div>
    </div>
  )
}

export { CookiebarBasic }
