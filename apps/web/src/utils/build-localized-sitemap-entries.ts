import { i18n } from '@repo/i18n/config'

import {
	type AbsoluteFn,
	type LocalizedDatedItem,
	type PathFn,
} from '~/types/locale-alternates'

import { getContentLanguageAlternates } from './get-content-language-alternates'

export function buildLocalizedSitemapEntries<T extends LocalizedDatedItem>(
	items: readonly T[],
	getPath: PathFn<T>,
	priority: number,
	toAbsolute: AbsoluteFn,
) {
	return items.flatMap((item) => {
		const languages = getContentLanguageAlternates(
			items,
			item,
			getPath,
			toAbsolute,
		)
		const localeKeys = Object.keys(languages).filter(
			(key) => key !== 'x-default',
		)
		const isPaired = localeKeys.length > 1

		// One sitemap row per paired cluster (emit from default locale)
		if (isPaired && item.locale !== i18n.defaultLocale) return []

		return [
			{
				url: toAbsolute(getPath(item)),
				lastModified: new Date(item.date),
				priority,
				alternates: { languages },
			},
		]
	})
}
