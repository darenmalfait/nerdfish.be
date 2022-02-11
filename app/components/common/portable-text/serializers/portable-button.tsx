import * as React from 'react'

import type { Serialized } from './serializers.types'

import { Cta, CtaProps } from '~/components/buttons'
import { Container } from '~/components/layout'
import { getBlogSlug } from '~/lib/routes'
import { LanguageCode, PageType, SanityPage, SanityPost } from '~/types'
import { localizeSlug } from '~/utils/i18n'

interface PortableButtonProps {
  link: {
    reference?: SanityPage | SanityPost
    url?: string
    text?: string
    style?: CtaProps['variant']
  }
}

function PortableButton({
  node: { link: { url, text, reference, style } = {} },
}: Serialized<PortableButtonProps>) {
  const isLink = !!url

  if (isLink) {
    return (
      <Container className="prose dark:prose-invert prose-light">
        <Cta
          variant={style}
          layout="button"
          href={url || ''}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block w-auto"
        >
          {text}
        </Cta>
      </Container>
    )
  }

  let slug = reference?.slug ?? ''

  if (reference?._type === PageType.blog) {
    slug = getBlogSlug((reference as SanityPost)?.publishedAt, slug)
  }

  const path = localizeSlug(
    slug,
    reference?.lang as LanguageCode,
    reference?._type,
  )

  return (
    <Container className="prose dark:prose-invert prose-light">
      <Cta variant={style} layout="button" href={path}>
        {text}
      </Cta>
    </Container>
  )
}

export { PortableButton }
