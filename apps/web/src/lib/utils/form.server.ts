import {env} from '~/env.mjs'

async function getErrorForRecaptcha(
  recaptcha: string | null,
): Promise<string | null> {
  if (!env.RECAPTCHA_SECRETKEY) {
    console.warn('Recaptcha not checked. RECAPTCHA_SECRETKEY is not set.')
    return null
  }

  if (!recaptcha) return 'Recaptcha is required'

  const recaptchaUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${env.RECAPTCHA_SECRETKEY}&response=${recaptcha}`

  const recaptchaRes = await fetch(recaptchaUrl, {method: 'POST'})

  if (!recaptchaRes.ok) {
    console.error(recaptchaRes)
    return 'Recaptcha failed'
  }

  const recaptchaJson = await recaptchaRes.json()

  if (!recaptchaJson.success) {
    console.error(recaptchaJson)
    return 'Recaptcha failed'
  }

  return null
}

export {getErrorForRecaptcha}
