// process.env reads from .env because it is configured inside `entry.server.tsx`

export function getEnv() {
  return {
    RECAPTCHA_SITEKEY: process.env.RECAPTCHA_SITEKEY,
    SANITY_STUDIO_API_DATASET: process.env.SANITY_STUDIO_API_DATASET,
    SANITY_STUDIO_API_PROJECT_ID: process.env.SANITY_STUDIO_API_PROJECT_ID,
    GTM_ID: process.env.GTM_ID,
  }
}

export type ENV = ReturnType<typeof getEnv>
