import { i18n } from '@repo/i18n/config'

import {
	type AbsoluteFn,
	type LocalizedDatedItem,
	type PathFn,
} from '~/types/locale-alternates'

import { getDateMatchedLanguageAlternates } from './get-date-matched-language-alternates'
import { getSelfLanguageAlternates } from './get-self-language-alternates'

/** Prefer date-matched pairs; fall back to self-only so bad Link headers never win. */
export function getContentLanguageAlternates<T extends LocalizedDatedItem>(
	items: readonly T[],
	current: T,
	getPath: PathFn<T>,
	toAbsolute: AbsoluteFn = (path) => path,
): Record<string, string> {
	const matched = getDateMatchedLanguageAlternates(
		items,
		current,
		getPath,
		toAbsolute,
	)
	if (matched) return matched

	const locale = current.locale ?? i18n.defaultLocale
	return getSelfLanguageAlternates(getPath(current), locale, toAbsolute)
}
