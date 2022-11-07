import { ButtonLink, Link as DarenLink } from '@daren/ui-components'

import NextLink, { LinkProps } from 'next/link'
import * as React from 'react'

import { stripPreSlash } from '../../lib/utils/string'

const Link = React.forwardRef<
  any,
  LinkProps & {
    children: React.ReactNode
    className?: string
    isButton?: boolean | null
    href: string
  }
>(function Link({ isButton, ...props }, ref) {
  const isExternal = props.href.startsWith('http')

  const href = isExternal ? props.href : `/${stripPreSlash(props.href)}`

  if (isButton) {
    return (
      <ButtonLink
        passHref
        ref={ref}
        as={NextLink}
        size="small"
        {...props}
        href={href}
        external={isExternal}
      />
    )
  }

  return (
    <DarenLink
      passHref
      ref={ref}
      as={NextLink}
      {...props}
      href={href}
      external={isExternal}
    />
  )
})

export { Link }
