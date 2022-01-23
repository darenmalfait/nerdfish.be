import * as React from 'react'

import { ArrowLink } from './arrow-link'

import { ButtonLink, ButtonProps } from './button'
import { Link } from './link'

import type { SanityCta } from '~/types/sanity'
import { localizeSlug } from '~/utils/i18n'

function CtaLink({
  kind,
  link,
  internalPage,
  title,
  lang,
  ...props
}: SanityCta & React.ComponentPropsWithoutRef<typeof Link>) {
  const path =
    internalPage && localizeSlug(internalPage?.slug || ``, internalPage?.lang)

  return (
    <Cta
      target={path?.startsWith('http') ? '_blank' : undefined}
      rel={path?.startsWith('http') ? 'noopener noreferrer' : undefined}
      className="mt-0 no-underline"
      size="small"
      layout={kind}
      href={path || link || ''}
      {...props}
    >
      {title && title}
    </Cta>
  )
}
export interface CtaProps extends ButtonProps {
  layout?: 'button' | 'link' | 'arrow'
}

function Cta({
  layout = 'button',
  ...props
}: CtaProps & React.ComponentPropsWithoutRef<typeof Link>) {
  if (!props.href) {
    return null
  }

  if (layout === 'arrow') {
    return <ArrowLink href={props.href}>{props.children}</ArrowLink>
  }

  if (layout === 'link') {
    return <Link {...props} />
  }

  return <ButtonLink {...props} />
}

export { Cta, CtaLink }
