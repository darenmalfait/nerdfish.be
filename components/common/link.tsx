import { ButtonLink, Link as DarenLink } from '@daren/ui-components'
import NextLink, { LinkProps } from 'next/link'
import * as React from 'react'
import Obfuscate from 'react-obfuscate'

import { stripPreSlash } from '../../lib/utils/string'

const hrefParameters = ['mailto', 'tel', 'sms', 'http', 'https']
const obfuscateParameters = ['mailto', 'tel', 'sms']

const Link = React.forwardRef<
  any,
  LinkProps & {
    children: React.ReactNode
    className?: string
    isButton?: boolean | null
    url?: string
    href: string
  }
>(function Link({ isButton, url = '', href = url, ...props }, ref) {
  const isExternal = hrefParameters.some(hrefParameter =>
    href.startsWith(hrefParameter),
  )

  const obfuscate = obfuscateParameters.find(obfuscateParameter =>
    href.startsWith(obfuscateParameter),
  )

  const slug = isExternal ? href : `/${stripPreSlash(href)}`

  if (isButton) {
    return (
      <ButtonLink
        passHref
        ref={ref}
        as={NextLink}
        size="small"
        {...props}
        href={slug}
        external={isExternal}
      >
        {obfuscate ? (
          <Obfuscate {...{ [obfuscate]: slug.replace(`${obfuscate}:`, '') }} />
        ) : (
          props.children
        )}
      </ButtonLink>
    )
  }

  return (
    <DarenLink
      passHref
      ref={ref}
      as={NextLink}
      {...props}
      href={slug}
      external={isExternal}
    >
      {obfuscate ? (
        <Obfuscate {...{ [obfuscate]: slug.replace(`${obfuscate}:`, '') }} />
      ) : (
        props.children
      )}
    </DarenLink>
  )
})

export { Link }
