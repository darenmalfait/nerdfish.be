import { type Locale } from '@repo/i18n/types'

export function filterByLocale<T extends { locale?: string }>(
	items: readonly T[],
	locale?: Locale,
): T[] {
	return locale ? items.filter((item) => item.locale === locale) : [...items]
}
