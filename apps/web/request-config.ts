import { IntlErrorCode } from '@repo/i18n/client'
import { i18n } from '@repo/i18n/config'
import { getRequestConfig } from '@repo/i18n/server'
import { type Locale } from '@repo/i18n/types'
import { notFound } from 'next/navigation'

// Using internationalization in Server Components
export default getRequestConfig(async ({ requestLocale }) => {
	const locale = (await requestLocale) as Locale | undefined

	// Validate that the incoming `locale` parameter is valid
	if (!locale || !i18n.locales.includes(locale)) {
		notFound()
	}

	return {
		onError(error) {
			if (error.code === IntlErrorCode.MISSING_MESSAGE) {
				// Missing translations are expected and should only log an error
				console.error(error)
			} else {
				// Other errors indicate a bug in the app and should be reported
				console.error('not your fault, but a bug in the app', error)
			}
		},
		getMessageFallback({ namespace, key, error }) {
			const path = [namespace, key].filter((part) => part != null).join('.')

			if (error.code === IntlErrorCode.MISSING_MESSAGE) {
				return `${path} is not yet translated`
			} else {
				return `Dear developer, please fix this message: ${path}`
			}
		},
		messages: {
			...(await import(`@repo/i18n/dictionaries/${locale}.json`)).default,
			...(await import(`@repo/i18n/dictionaries/zod/${locale}.json`)).default,
		},
		locale,
	}
})
