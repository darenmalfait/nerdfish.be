/**
 * @type {import('@remix-run/dev/config').AppConfig}
 */
module.exports = {
  cacheDirectory: './node_modules/.cache/remix',
  ignoredRouteFiles: ['.*', '**/*.css', '**/*.test.{js,jsx,ts,tsx}'],
  serverDependenciesToBundle: [
    '@headlessui/react',
    'remix-image',
    'remix-image/server',
    'react-medium-image-zoom',
  ],
}
