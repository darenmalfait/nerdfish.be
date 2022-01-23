import { isBrowser } from '@daren/utils'
import imageUrlBuilder from '@sanity/image-url'
import { default as query } from 'groq'
import PicoSanity from 'picosanity'

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
  useCdn: false,
})

// Helper function to choose the correct client
function getClient(usePreview = false) {
  return usePreview ? previewClient : sanityClient
}

function groq(strings: TemplateStringsArray, ...keys: any[]) {
  return query(strings, ...keys)

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

export {
  getClient,
  previewClient,
  sanityClient,
  groq,
  urlFor,
  getLowQualityUrlFor,
}
