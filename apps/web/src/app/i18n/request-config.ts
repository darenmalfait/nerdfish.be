import { getRequestConfig } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { i18n } from './config'

// Using internationalization in Server Components
export default getRequestConfig(async ({ requestLocale }) => {
	const locale = await requestLocale

	// Validate that the incoming `locale` parameter is valid
	if (!locale || !i18n.locales.includes(locale)) {
		notFound()
	}

	return {
		messages: (await import(`./dictionaries/${locale}.json`)).default,
	}
})
