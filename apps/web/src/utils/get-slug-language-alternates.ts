import { i18n } from '@repo/i18n/config'
import { type Locale } from '@repo/i18n/types'

import { type AbsoluteFn } from '~/types/locale-alternates'

import { withXDefault } from './with-x-default'

/** Same slug across locales (products). */
export function getSlugLanguageAlternates(
	slug: string,
	getPath: (locale: Locale) => string,
	toAbsolute: AbsoluteFn = (path) => path,
	locales: readonly Locale[] = i18n.locales,
): Record<string, string> {
	const languages = Object.fromEntries(
		locales.map((locale) => [locale, toAbsolute(getPath(locale))]),
	)
	const defaultPath = languages[i18n.defaultLocale]
	if (!defaultPath) {
		throw new Error(`Missing default locale path for slug ${slug}`)
	}

	return withXDefault(languages, defaultPath)
}
