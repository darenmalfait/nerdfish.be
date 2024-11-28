import 'server-only'

import { i18n } from '~/app/i18n/config'
import type { Dictionary, Locale } from '~/app/i18n/types'

// We enumerate all dictionaries here for better linting and typescript support
// We also get the default import for cleaner types
const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
	en: () => import('./dictionaries/en.json').then((module) => module.default),
	nl: () => import('./dictionaries/nl.json').then((module) => module.default),
}

export const getTranslations = async (locale: Locale): Promise<Dictionary> => {
	const dict = dictionaries[locale]?.() ?? dictionaries[i18n.defaultLocale]?.()
	if (!dict) throw new Error('Dictionary not found')

	return dict
}
