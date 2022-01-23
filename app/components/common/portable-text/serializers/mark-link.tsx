import * as React from 'react'

import { Cta } from '~/components/buttons'

interface MarkLinkProps {
  mark: {
    href?: string
    page?: {
      lang: string
      slug: string
    }
    styles: {
      style?: {
        style?: string
      }
      isBlock?: boolean
    }
    isButton?: boolean
    children?: React.ReactNode
  }
  children: React.ReactNode[]
}

function MarkLink({
  mark: { href, page, isButton, styles = {} },
  children,
}: MarkLinkProps) {
  const { style } = styles || {}

  const isLink = !!href
  const title = children ? children[0] : ''
  const layout = isButton ? 'button' : 'link'

  const inverted = style === 'inverted'
  const variant = inverted ? 'secondary' : 'primary'

  if (isLink) {
    return (
      <Cta
        variant={variant}
        layout={layout}
        href={href || ''}
        rel="noopener noreferrer"
      >
        {title}
      </Cta>
    )
  }

  return (
    <Cta
      variant={variant}
      layout={layout}
      href={`/${page?.lang}/${page?.slug}` || ''}
    >
      {title}
    </Cta>
  )
}

export { MarkLink }
