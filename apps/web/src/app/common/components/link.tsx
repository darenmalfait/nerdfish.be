'use client'

import * as React from 'react'
import NextLink, {LinkProps} from 'next/link'
import {stripPreSlash} from '@nerdfish-website/lib/utils'
import {getButtonClassName} from '@nerdfish/ui'
import Obfuscate from 'react-obfuscate'

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
      <NextLink
        passHref
        ref={ref}
        as={NextLink as any}
        size="sm"
        {...(props as any)}
        className={getButtonClassName({
          className: `${props.className} cursor-pointer`,
        })}
        href={slug}
        target={isExternal ? '_blank' : undefined}
        suppressHydrationWarning
      />
    )
  }

  return (
    <NextLink
      passHref
      ref={ref}
      as={NextLink as any}
      {...props}
      href={slug}
      target={isExternal ? '_blank' : undefined}
      suppressHydrationWarning
    />
  )
})

export {Link}
