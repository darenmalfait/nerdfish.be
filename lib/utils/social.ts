import {type z} from 'zod'

import {type ogImageSchema} from '../types/og'
import {getDomainUrl} from './misc'

// https://support.cloudinary.com/hc/en-us/community/posts/200788162-Using-special-characters-in-Text-overlaying-
function escapeSpecialCharacters(title: string) {
  return title.replace(/,/g, '%2C').replace(/\//g, '%2F')
}

function truncateText(text: string, maxLength = 60) {
  if (text.length <= maxLength) return text
  return `${text.substring(0, maxLength)}...`
}

function generateOGImageUrl({
  cardType = 'primary',
  ...props
}: z.infer<typeof ogImageSchema> & {
  cardType?: 'primary' | 'secondary'
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

function generateSocialImage({
  title,
  cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  imagePublicID,
  cloudinaryUrlBase = 'https://res.cloudinary.com',
  version = null,
  titleFont = 'arial',
  titleExtraConfig = '_bold',
  imageWidth = 1200,
  imageHeight = 630,
  textAreaWidth = 500,
  textAreaHeight = 450,
  textLeftOffset = 45,
  textBottomOffset = -40,
  textColor = 'FFFFFF',
  titleFontSize = 50,
  image = 'og:image',
  variant = 'primary',
}: {
  title: string
  cloudName?: string
  imagePublicID: string
  cloudinaryUrlBase?: string
  version?: string | null
  titleFont?: string
  titleExtraConfig?: string
  imageWidth?: number
  imageHeight?: number
  textAreaWidth?: number
  textAreaHeight?: number
  textLeftOffset?: number
  textBottomOffset?: number
  textColor?: string
  titleFontSize?: number
  image?: string | null
  variant?: 'primary' | 'secondary' | string | null
}) {
  // configure social media image dimensions, quality, and format
  const imageConfig = [
    `w_${imageWidth}`,
    `h_${imageHeight}`,
    'c_fill',
    'f_auto',
  ].join(',')

  // configure the sub-image
  const subImageConfig = [
    'a_0',
    'c_fill',
    variant === 'primary' ? 'g_east' : 'g_center',
    variant === 'primary' ? 'h_630' : `h_${imageHeight}`,
    variant === 'primary' ? `l_${image}` : `u_${image}`,
    variant === 'primary' ? 'w_600' : `w_${imageWidth}`,
  ].join(',')

  // configure the diagonal overlay
  const diagonalOverlayConfig = [
    'c_scale',
    'g_west',
    'h_630',
    'l_og-mask',
    'w_356',
    'x_425',
  ].join(',')

  // configure the title text
  const titleConfig = [
    `w_${textAreaWidth}`,
    `h_${textAreaHeight}`,
    'c_fit',
    `co_rgb:${textColor}`,
    'g_west',
    `x_${textLeftOffset}`,
    `y_${textBottomOffset}`,
    `l_text:${titleFont}_${titleFontSize}${titleExtraConfig}:${encodeURIComponent(
      escapeSpecialCharacters(truncateText(title)),
    )}`,
  ].join(',')

  // combine all the pieces required to generate a Cloudinary URL
  const urlParts = [
    cloudinaryUrlBase,
    cloudName,
    'image',
    'upload',
    imageConfig,
    variant === 'primary' ? titleConfig : '',
    subImageConfig,
    variant === 'primary' ? diagonalOverlayConfig : '',
    version,
    imagePublicID,
  ]

  // remove any falsy sections of the URL (e.g. an undefined version)
  const validParts = urlParts.filter(Boolean)

  // join all the parts into a valid URL to the generated image
  return validParts.join('/')
}

function getFileNameFromUrl(url?: string | null) {
  if (!url) return null

  const parts = url.split('/')
  const filename = parts[parts.length - 1]
  return filename?.split('.')[0]
}

export {generateSocialImage, getFileNameFromUrl, generateOGImageUrl}
