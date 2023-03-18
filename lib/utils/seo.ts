import {type Metadata} from 'next'
import {type OpenGraphType} from 'next/dist/lib/metadata/types/opengraph-types'

import {getDomainUrl} from './misc'
import {stripPreSlash, stripTrailingSlash} from './string'

type SocialMetas = {
  canonical?: string | null
  description: string
  ogImage: string
  schema?: string
  title: string
  type?: OpenGraphType
  url: string
  other?: Metadata
}

function getMetaData({
  url: path,
  ogImage,
  title,
  description,
  canonical,
  type,
  other,
}: SocialMetas): Metadata {
  const basePath = stripTrailingSlash(getDomainUrl() ?? '')

  const url = path.startsWith('http')
    ? path
    : `${basePath}/${stripPreSlash(path)}`

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
          url: ogImage,
        },
      ],
      ...other?.openGraph,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],

      ...other?.twitter,
    },
  }
}

export {getMetaData}
