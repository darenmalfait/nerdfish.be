import type { ENV } from '~/utils/get-env.server'

declare global {
  // eslint-disable-next-line
  var dataLayer: Record<string, unknown>[],
  // eslint-disable-next-line no-var
  var ENV: ENV
  // eslint-disable-next-line no-var
  var grecaptcha: any
}
