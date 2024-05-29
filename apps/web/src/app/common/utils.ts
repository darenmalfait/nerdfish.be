import {type Metadata} from 'next'
import {stripPreSlash, stripTrailingSlash} from '@nerdfish-website/lib/utils'
import {type ogImageSchema} from '@nerdfish-website/lib/validations'
import {formatDate} from 'date-fns'
import {type z} from 'zod'

import {env} from '~/env.mjs'

import {type SocialMetas} from './types'

export function getDomainUrl(): string | undefined {
  if (env.NEXT_PUBLIC_URL) {
    return env.NEXT_PUBLIC_URL
  }
}

export function generateOGImageUrl({
  cardType = 'primary',
  ...props
}: z.infer<typeof ogImageSchema> & {
  cardType?: string | null
}) {
  const url = getDomainUrl()

  const ogUrl =
    cardType === 'secondary'
      ? new URL(`${url}/api/og/secondary`)
      : new URL(`${url}/api/og/primary`)
  Object.entries(props).forEach(([key, value]) => {
    ogUrl.searchParams.set(key, value ?? '')
  })

  return ogUrl.toString()
}

export function getMetaData({
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
    metadataBase: new URL(basePath),
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

export function getDatedSlug(date: string, slug: string) {
  if (!date) return slug

  const dateSegment = formatDate(new Date(date), 'yyyy/MM')
  return `/${dateSegment}/${slug || ''}/`
}

const CLOUDINARY_REGEX =
  /^.+\.cloudinary\.com\/(?:[^/]+\/)(?:(image|video)\/)?(?:(upload|fetch)\/)?(?:(?:[^_/]+_[^,/]+,?)*\/)?(?:v(\d+|\w{1,2})\/)?([^.^\s]+)(?:\.(.+))?$/

export function getFileNameFromUrl(url: string) {
  const matches = url.match(CLOUDINARY_REGEX)
  if (!matches) return url
  const [, , , , filename] = matches

  return filename
}

export function getLowQualityUrlFor(url: string, extension: string = 'webp') {
  const filename = getFileNameFromUrl(url)

  return `https://res.cloudinary.com/${env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/w_50/${filename}.${extension}`
}

export function buildSrc(
  url: string,
  {
    width = 1000,
    height,
    format = 'webp',
  }: {
    width?: number
    height?: number
    format?: string
  } = {},
) {
  const filename = getFileNameFromUrl(url)

  if (height) {
    // no stretch
    return `https://res.cloudinary.com/${env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/w_${width},h_${height},c_fill/${filename}.${format}`
  }

  return `https://res.cloudinary.com/${env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/w_${width}/${filename}.${format}`
}

export function buildSrcSet(
  imageUrl: string,
  {
    srcSizes = [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    format,
  }: {
    srcSizes?: number[]
    format?: string
  } = {},
) {
  const sizes = srcSizes.map(width => {
    const imgSrc = buildSrc(imageUrl, {
      width,
      format,
    })

    return `${imgSrc} ${width}w`
  })

  return sizes.join(',')
}
