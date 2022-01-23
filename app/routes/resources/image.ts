import type { LoaderFunction } from 'remix'
import { imageLoader, DiskCache } from 'remix-image/server'

const config = {
  selfUrl: process.env.SANITY_STUDIO_PROJECT_URL || '',
  whitelistedDomains: ['cdn.sanity.io'],
  cache: new DiskCache(),
}

export const loader: LoaderFunction = ({ request }) => {
  return imageLoader(config, request)
}
