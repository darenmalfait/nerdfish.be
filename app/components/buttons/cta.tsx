import * as React from 'react'

import { ArrowLink } from './arrow-link'

import { ButtonLink, ButtonProps } from './button'
import { Link } from './link'

import { DoubleLabelLink } from '.'

import { localizeSlug } from '~/lib/utils/i18n'
import type { SanityCta } from '~/types/sanity'

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
      {title}
    </Cta>
  )
}
export interface CtaProps extends ButtonProps {
  description?: SanityCta['description']
  layout?: 'button' | 'link' | 'arrow' | 'double-label'
}

function Cta({
  layout = 'button',
  ...props
}: CtaProps & React.ComponentPropsWithoutRef<typeof Link>) {
  if (!props.href) {
    return null
  }

  if (layout === 'arrow') {
    return (
      <ArrowLink href={props.href} className={props.className}>
        {props.children}
      </ArrowLink>
    )
  }

  if (layout === 'link') {
    return <Link {...props} />
  }

  if (layout === 'double-label') {
    return (
      <DoubleLabelLink
        href={props.href}
        description={props.description}
        className={props.className}
      >
        {props.children}
      </DoubleLabelLink>
    )
  }

  return <ButtonLink {...props} />
}

export { Cta, CtaLink }
