import {createEnv} from '@t3-oss/env-nextjs'
import {z} from 'zod'

export const env = createEnv({
  /*
   * Serverside Environment variables, not available on the client.
   * Will throw if you access these variables on the client.
   */
  server: {
    // Application
    ALGOLIA_ADMIN_KEY: z.string().min(1),
    RECAPTCHA_SECRETKEY: z.string().min(1),
    RESEND_API_KEY: z.string().min(1),

    // CMS
    TINA_TOKEN: z.string().min(1),
    CLOUDINARY_API_SECRET: z.string().min(1),

    // Environment
    NODE_ENV: z
      .enum(['development', 'production', 'test'])
      .default('development'),
    HEAD: z.string().optional(),
  },
  /*
   * Environment variables available on the client (and server).
   *
   * 💡 You'll get typeerrors if these are not prefixed with NEXT_PUBLIC_.
   */
  client: {
    // Application
    NEXT_PUBLIC_URL: z.string().url(),

    NEXT_PUBLIC_ALGOLIA_APP_ID: z.string().min(1),
    NEXT_PUBLIC_ALGOLIA_INDEX_NAME: z.string().min(1),
    NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY: z.string().min(1),

    NEXT_PUBLIC_RECAPTCHA_SITEKEY: z.string().min(1),

    // CMS
    NEXT_PUBLIC_TINA_BRANCH: z.string().optional(),
    NEXT_PUBLIC_TINA_CLIENT_ID: z.string().min(1),
    NEXT_PUBLIC_CLOUDINARY_API_KEY: z.string().min(1),
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: z.string().min(1),

    // Environment
    NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF: z.string().optional(),
  },
  /*
   * Due to how Next.js bundles environment variables on Edge and Client,
   * we need to manually destructure them to make sure all are included in bundle.
   *
   * 💡 You'll get typeerrors if not all variables from `server` & `client` are included here.
   */
  runtimeEnv: {
    // Application
    NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,

    NEXT_PUBLIC_ALGOLIA_APP_ID: process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
    NEXT_PUBLIC_ALGOLIA_INDEX_NAME: process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME,
    NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY:
      process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY,

    NEXT_PUBLIC_RECAPTCHA_SITEKEY: process.env.NEXT_PUBLIC_RECAPTCHA_SITEKEY,
    ALGOLIA_ADMIN_KEY: process.env.ALGOLIA_ADMIN_KEY,
    RECAPTCHA_SECRETKEY: process.env.RECAPTCHA_SECRETKEY,
    RESEND_API_KEY: process.env.RESEND_API_KEY,

    // CMS
    TINA_TOKEN: process.env.TINA_TOKEN,
    NEXT_PUBLIC_TINA_BRANCH: process.env.NEXT_PUBLIC_TINA_BRANCH,
    NEXT_PUBLIC_TINA_CLIENT_ID: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
    NEXT_PUBLIC_CLOUDINARY_API_KEY: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME:
      process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,

    // Environment
    NODE_ENV: process.env.NODE_ENV,
    HEAD: process.env.HEAD,
    NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF:
      process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF,
  },
})
