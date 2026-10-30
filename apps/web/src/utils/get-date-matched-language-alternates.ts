import { i18n } from '@repo/i18n/config'

import {
	type AbsoluteFn,
	type LocalizedDatedItem,
	type PathFn,
} from '~/types/locale-alternates'

import { withXDefault } from './with-x-default'

/**
 * Pair locale variants that share an exact publish date.
 * Temporary until content has an explicit translation key.
 */
export function getDateMatchedLanguageAlternates<T extends LocalizedDatedItem>(
	items: readonly T[],
	current: T,
	getPath: PathFn<T>,
	toAbsolute: AbsoluteFn = (path) => path,
): Record<string, string> | undefined {
	if (!current.locale) return undefined

	const matches = items.filter((item) => item.date === current.date)
	const byLocale = new Map<string, T>()

	for (const item of matches) {
		if (!item.locale) continue
		// Ambiguous: more than one item for a locale on the same date
		if (byLocale.has(item.locale)) return undefined
		byLocale.set(item.locale, item)
	}

	if (!byLocale.has(current.locale) || byLocale.size < 2) return undefined

	const languages = Object.fromEntries(
		[...byLocale.entries()].map(([locale, item]) => [
			locale,
			toAbsolute(getPath(item)),
		]),
	)

	const defaultItem = byLocale.get(i18n.defaultLocale)
	const defaultPath = defaultItem
		? toAbsolute(getPath(defaultItem))
		: toAbsolute(getPath(current))

	return withXDefault(languages, defaultPath)
}
