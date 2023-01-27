import {isAuthorized} from '@tinacms/auth'
import {
  createMediaHandler,
  mediaHandlerConfig,
} from 'next-tinacms-cloudinary/dist/handlers'
import invariant from 'tiny-invariant'

export const config = mediaHandlerConfig

invariant(
  process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  'Missing env var NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME',
)

invariant(
  process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  'Missing env var NEXT_PUBLIC_CLOUDINARY_API_KEY',
)

invariant(
  process.env.CLOUDINARY_API_SECRET,
  'Missing env var CLOUDINARY_API_SECRET',
)

export default createMediaHandler({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  authorized: async (req, _res) => {
    try {
      if (process.env.NODE_ENV == 'development') {
        return true
      }

      const user = await isAuthorized(req)

      return user?.verified
    } catch (e) {
      console.error(e)
      return false as any
    }
  },
})
