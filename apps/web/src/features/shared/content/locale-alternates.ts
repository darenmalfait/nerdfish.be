import { i18n } from '@repo/i18n/config'
import { type Locale } from '@repo/i18n/types'

type LocalizedItem = {
	locale?: string
}

type LocalizedDatedItem = LocalizedItem & {
	date: string
}

type PathFn<T> = (item: T) => string
type AbsoluteFn = (pathname: string) => string

const identity: AbsoluteFn = (pathname) => pathname

function withXDefault(
	languages: Record<string, string>,
	defaultPath: string,
): Record<string, string> {
	return {
		...languages,
		'x-default': defaultPath,
	}
}

/** Current locale + x-default only — overrides wrong same-slug framework alternates. */
export function getSelfLanguageAlternates(
	pathname: string,
	locale: string,
	toAbsolute: AbsoluteFn = identity,
): Record<string, string> {
	const absolute = toAbsolute(pathname)
	return withXDefault({ [locale]: absolute }, absolute)
}

/**
 * Pair locale variants that share an exact publish date.
 * Temporary until content has an explicit translation key.
 */
export function getDateMatchedLanguageAlternates<T extends LocalizedDatedItem>(
	items: readonly T[],
	current: T,
	getPath: PathFn<T>,
	toAbsolute: AbsoluteFn = identity,
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

/** Prefer date-matched pairs; fall back to self-only so bad Link headers never win. */
export function getContentLanguageAlternates<T extends LocalizedDatedItem>(
	items: readonly T[],
	current: T,
	getPath: PathFn<T>,
	toAbsolute: AbsoluteFn = identity,
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

/** Same slug across locales (products). */
export function getSlugLanguageAlternates(
	slug: string,
	getPath: (locale: Locale) => string,
	toAbsolute: AbsoluteFn = identity,
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
