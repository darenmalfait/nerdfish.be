import 'server-only'

import { i18n, type Locale } from './i18n-config'

export type Dictionary = {
	'contact.dataUsage': string
	'contact.email': string
	'contact.genericError': string
	'contact.name': string
	'contact.other': string
	'contact.otherDescription': string
	'contact.project': string
	'contact.recaptchaError': string
	'contact.send': string
	'contact.services': string
	'contact.servicesDescription': string
	'contact.success': string
	'contact.webdesign': string
	'contact.webdesignDescription': string
	'theme.dark': string
	'theme.light': string
	'theme.system': string
	'features.readMore': string
}

// We enumerate all dictionaries here for better linting and typescript support
// We also get the default import for cleaner types
const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
	en: () =>
		import('../dictionaries/en.json').then(
			(module) => module.default as Dictionary,
		),
	nl: () =>
		import('../dictionaries/nl.json').then(
			(module) => module.default as Dictionary,
		),
}

export const getDictionary = async (locale: Locale): Promise<Dictionary> => {
	const dict = dictionaries[locale]?.() ?? dictionaries[i18n.defaultLocale]?.()
	if (!dict) throw new Error('Dictionary not found')

	return dict
}
