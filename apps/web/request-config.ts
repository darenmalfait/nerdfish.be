import { i18n } from '@repo/i18n/config'
import { getRequestConfig } from '@repo/i18n/server'
import { notFound } from 'next/navigation'

// Using internationalization in Server Components
export default getRequestConfig(async ({ requestLocale }) => {
	const locale = await requestLocale

	// Validate that the incoming `locale` parameter is valid
	if (!locale || !i18n.locales.includes(locale)) {
		notFound()
	}

	return {
		messages: {
			...(await import(`@repo/i18n/dictionaries/${locale}.json`)).default,
			...(await import(`@repo/i18n/dictionaries/zod/${locale}.json`)).default,
		},
		locale,
	}
})
