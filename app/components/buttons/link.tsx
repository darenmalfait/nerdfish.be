/* eslint-disable jsx-a11y/anchor-has-content */
import * as React from 'react'
import { Link as RemixLink, LinkProps } from 'remix'

type AnchorProps = React.DetailedHTMLProps<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>

const Link = React.forwardRef<
  HTMLAnchorElement,
  AnchorProps & {
    reload?: boolean
    to?: LinkProps['to']
    prefetch?: LinkProps['prefetch']
    lang?: string
  }
>(function Link(
  { to, href = '#', download, reload, lang, prefetch, ...rest },
  ref,
) {
  let toUrl = ''
  let shouldUserRegularAnchor = reload || download

  if (!shouldUserRegularAnchor && typeof href === 'string') {
    if (href.startsWith('/')) {
      toUrl = href
    }
    shouldUserRegularAnchor = href.startsWith('http') || href.startsWith('#')
  }

  if (!shouldUserRegularAnchor && typeof to === 'string') {
    toUrl = to
    shouldUserRegularAnchor = to.startsWith('http')
  }

  if (!shouldUserRegularAnchor && typeof to === 'object') {
    const hash = to.hash ? `#${to.hash}` : ''
    const queryString = to.search ? `?${to.search}` : ''
    toUrl = `${to.pathname ?? ''}${hash}${queryString}`
    shouldUserRegularAnchor = to.pathname?.startsWith('http')
  }

  if (shouldUserRegularAnchor) {
    return <a {...rest} download={download} href={href || toUrl} ref={ref} />
  } else {
    return (
      <RemixLink
        prefetch={prefetch}
        {...rest}
        to={to || href || ''}
        ref={ref}
      />
    )
  }
})

export { Link }
