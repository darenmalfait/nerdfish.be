import type {Metadata} from 'next'
import type {OpenGraphType} from 'next/dist/lib/metadata/types/opengraph-types'

import {getDomainUrl} from './misc'
import {generateSocialImage} from './social'
import {stripPreSlash, stripTrailingSlash} from './string'

type SocialMetas = {
  canonical?: string | null
  cardType?: 'primary' | 'secondary' | string | null
  description: string
  image?: string | null
  schema?: string
  subImage?: string | null
  title: string
  type?: OpenGraphType
  url: string
  other?: Metadata
}

function getMetaData({
  url: path,
  image: ogImage,
  title,
  description,
  canonical,
  subImage,
  cardType = 'primary',
  type,
  other,
}: SocialMetas): Metadata {
  const basePath = stripTrailingSlash(getDomainUrl() ?? '')
  let metaImage = ogImage

  const url = path.startsWith('http')
    ? path
    : `${basePath}/${stripPreSlash(path)}`

  if (!ogImage) {
    const variant = cardType ?? 'primary'

    metaImage = generateSocialImage({
      title: variant === 'primary' ? title : '',
      imagePublicID:
        variant === 'primary' ? 'social.png' : 'social-transparent.png',
      image: subImage,
      variant,
    })
  }

  const image = metaImage?.startsWith('http')
    ? metaImage
    : `${basePath}/${stripPreSlash(metaImage ?? '')}`

  return {
    ...other,
    icons: {
      icon: '/favicon.ico',
      apple: '/apple-touch-icon.png',
    },
    title,
    description,
    alternates: {
      canonical: canonical ?? url,
      ...other?.alternates,
    },
    openGraph: {
      title,
      description,
      type: type ?? 'website',
      url,
      images: [
        {
          url: image,
        },
      ],
      ...other?.openGraph,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
      ...other?.twitter,
    },
  }
}

export {getMetaData}
