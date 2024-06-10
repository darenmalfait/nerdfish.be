'use client'

import * as React from 'react'
import NextLink, {type LinkProps} from 'next/link'
import {stripPreSlash} from '@nerdfish-website/lib/utils'
import {Button} from '@nerdfish/ui'
import {cx} from '@nerdfish/utils'
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
      <Button asChild>
        <NextLink
          passHref
          ref={ref}
          size="sm"
          {...(props as any)}
          className={cx('cursor-pointer', props.className)}
          href={slug}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
        />
      </Button>
    )
  }

  return (
    <NextLink
      ref={ref}
      {...props}
      href={slug}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
    />
  )
})

export {Link}
