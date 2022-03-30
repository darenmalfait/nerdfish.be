import * as React from 'react'

import { Cta } from '~/components/buttons'

interface MarkLinkProps {
  mark: {
    href?: string
    children?: React.ReactNode
  }
  children: React.ReactNode[]
}

function MarkLink({ mark: { href }, children }: MarkLinkProps) {
  const title = children.length > 0 ? children[0] : ''

  return (
    <Cta
      layout="link"
      href={href || ''}
      target="_blank"
      rel="noopener noreferrer"
    >
      {title}
    </Cta>
  )
}

export { MarkLink }
