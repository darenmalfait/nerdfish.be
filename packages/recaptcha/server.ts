import { keys } from './keys'

export async function verifyRecaptcha(response?: string) {
	if (!keys().RECAPTCHA_SECRETKEY) return { success: true }
	if (!response) return { error: 'Recaptcha is required' }

	const recaptchaUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${keys().RECAPTCHA_SECRETKEY}&response=${response}`

	const recaptchaRes = await fetch(recaptchaUrl, { method: 'POST' })

	if (!recaptchaRes.ok) {
		console.error(recaptchaRes)

		return { error: 'Recaptcha failed' }
	}

	const recaptchaJson = await recaptchaRes.json()

	if (!recaptchaJson.success) {
		console.error(recaptchaJson)

		return { error: 'Recaptcha failed' }
	}

	return { success: true }
}
