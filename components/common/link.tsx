import * as React from 'react'
import NextLink, {LinkProps} from 'next/link'
import {ButtonLink, Link as DarenLink} from '@daren/ui-components'
import Obfuscate from 'react-obfuscate'

import {stripPreSlash} from '~/lib/utils/string'

const hrefParameters = ['mailto', 'tel', 'sms', 'http', 'https']

const obfuscateParameters = {
  mailto: 'email',
  tel: 'tel',
  sms: 'sms',
}

const Link = React.forwardRef<
  any,
  LinkProps & {
    children: React.ReactNode
    className?: string
    isButton?: boolean | null
    url?: string
    href: string
  }
>(function Link({isButton, url = '', href = url, ...props}, ref) {
  const isExternal = hrefParameters.some(hrefParameter =>
    href.startsWith(hrefParameter),
  )

  const obfuscate = Object.keys(obfuscateParameters).find(obfuscateParameter =>
    href.startsWith(obfuscateParameter),
  ) as keyof typeof obfuscateParameters | undefined

  const slug = isExternal ? href : `/${stripPreSlash(href)}`

  if (obfuscate) {
    return (
      <Obfuscate
        {...{
          [obfuscateParameters[obfuscate]]: slug.replace(`${obfuscate}:`, ''),
        }}
      />
    )
  }

  if (isButton) {
    return (
      <ButtonLink
        passHref
        ref={ref}
        as={NextLink as any}
        size="sm"
        {...(props as any)}
        href={slug}
        external={isExternal}
        suppressHydrationWarning
      />
    )
  }

  return (
    <DarenLink
      passHref
      ref={ref}
      as={NextLink as any}
      {...props}
      href={slug}
      external={isExternal}
      suppressHydrationWarning
    />
  )
})

export {Link}
