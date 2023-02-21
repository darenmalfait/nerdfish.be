function getEnv() {
  return {
    NODE_ENV: process.env.NODE_ENV,
    RECAPTCHA_SITEKEY: process.env.RECAPTCHA_SITEKEY,
    ALGOLIA_APP_ID: process.env.ALGOLIA_APP_ID,
    ALGOLIA_INDEX_NAME: process.env.ALGOLIA_INDEX_NAME,
    ALGOLIA_SEARCH_API_KEY: process.env.ALGOLIA_SEARCH_API_KEY,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    TINA_CLIENT_ID: process.env.TINA_CLIENT_ID,
  }
}

type ENV = ReturnType<typeof getEnv>

// App puts these on
declare global {
  // eslint-disable-next-line
  var ENV: ENV
  interface Window {
    ENV: ENV
  }
}

export {getEnv}
