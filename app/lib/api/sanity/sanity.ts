import { isBrowser } from '@daren/utils'
import imageUrlBuilder from '@sanity/image-url'
import { default as query } from 'groq'
import PicoSanity from 'picosanity'

import type { ResponsiveProps } from '~/components/elements'

import type { SanityImage } from '~/types'

const SANITY_STUDIO_API_PROJECT_ID = isBrowser
  ? (window?.ENV.SANITY_STUDIO_API_PROJECT_ID as string)
  : process?.env.SANITY_STUDIO_API_PROJECT_ID

const SANITY_STUDIO_API_DATASET = isBrowser
  ? (window?.ENV.SANITY_STUDIO_API_DATASET as string)
  : process?.env.SANITY_STUDIO_API_DATASET

if (!SANITY_STUDIO_API_PROJECT_ID) {
  throw new Error("Couldn't find env var SANITY_STUDIO_API_PROJECT_ID!")
}
if (!SANITY_STUDIO_API_DATASET) {
  throw new Error("Couldn't find env var SANITY_STUDIO_API_DATASET")
}

interface ClientConfig {
  projectId: string
  dataset: string
  apiVersion?: string
  token?: string
  useCdn?: boolean
  withCredentials?: boolean
}

export const config: ClientConfig = {
  apiVersion: new Date().toISOString().split(`T`)[0],
  dataset: SANITY_STUDIO_API_DATASET || '',
  projectId: SANITY_STUDIO_API_PROJECT_ID || '',
  useCdn: true,
}

// Standard client for fetching data
const sanityClient = new PicoSanity(config)

// Authenticated client for fetching draft documents
const previewClient = new PicoSanity({
  ...config,
  token:
    typeof window === 'undefined' && process
      ? process.env.SANITY_API_TOKEN
      : ``,
  useCdn: false,
})

// Helper function to choose the correct client
function getClient(usePreview = false) {
  return usePreview ? previewClient : sanityClient
}

function groq(strings: TemplateStringsArray, ...keys: any[]) {
  return query(strings, ...keys)

  // TODO: find a fix
  // this makes the query crash in safari
  // .replace(
  //   /(?<!\[\()\s(?![\w\s$&"=.!_*()/,[]*[\])])/g,
  //   '',
  // )
}

const urlFor = (source: SanityImage, maxWidth = 1200) => {
  const builder = imageUrlBuilder(config).image(source).format('png')

  if (maxWidth) {
    return builder.maxWidth(maxWidth)
  }

  return builder
}

const getLowQualityUrlFor = (source: SanityImage): string => {
  return imageUrlBuilder(config).image(source).width(25).url()
}

export type ResponsiveSanityImageProps = {
  src: string
  srcSet?: string
  sizes?: string
}

const useResponsiveSanityImage = (
  image: SanityImage,
  responsive: ResponsiveProps[] = [],
): ResponsiveSanityImageProps => {
  const imageBuilder = urlFor(image)

  const result = responsive.reduce(
    (accum, { size, maxWidth }) => {
      let responsiveImage = imageBuilder

      if (size.width) {
        responsiveImage = imageBuilder.width(size.width)
      }

      if (size.height) {
        responsiveImage = imageBuilder.height(size.height)
      }

      const srcSetUrl = responsiveImage.url()

      accum.srcSet.push(srcSetUrl)

      if (maxWidth) {
        accum.sizes.push(`(max-width: ${maxWidth}px) ${size.width}px`)
      }

      if (size.width > accum.largestWidth) {
        accum.largestWidth = size.width
        accum.src = srcSetUrl
      }

      return accum
    },
    {
      src: imageBuilder.url() || '',
      srcSet: [] as string[],
      sizes: [] as string[],
      largestWidth: 0,
    },
  )

  return {
    src: result.src,
    ...(result.srcSet.length && {
      srcSet: result.srcSet.join(', '),
    }),
    ...(result.sizes.length && {
      sizes: result.sizes.join(', '),
    }),
  }
}

export {
  getClient,
  previewClient,
  sanityClient,
  groq,
  urlFor,
  getLowQualityUrlFor,
  useResponsiveSanityImage,
}
