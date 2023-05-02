import {env} from '~/env.mjs'

const CLOUDINARY_REGEX =
  /^.+\.cloudinary\.com\/(?:[^/]+\/)(?:(image|video)\/)?(?:(upload|fetch)\/)?(?:(?:[^_/]+_[^,/]+,?)*\/)?(?:v(\d+|\w{1,2})\/)?([^.^\s]+)(?:\.(.+))?$/

function getFileNameFromUrl(url: string) {
  const matches = url.match(CLOUDINARY_REGEX)
  if (!matches) return url
  const [, , , , filename] = matches

  return filename
}

function getLowQualityUrlFor(url: string, extension: string = 'webp') {
  const filename = getFileNameFromUrl(url)

  return `https://res.cloudinary.com/${env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/w_50/${filename}.${extension}`
}

function buildSrc(
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

function buildSrcSet(
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

export {getFileNameFromUrl, getLowQualityUrlFor, buildSrc, buildSrcSet}
