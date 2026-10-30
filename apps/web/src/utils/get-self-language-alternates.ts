import { type AbsoluteFn } from '~/types/locale-alternates'

import { withXDefault } from './with-x-default'

/** Current locale + x-default only — overrides wrong same-slug framework alternates. */
export function getSelfLanguageAlternates(
	pathname: string,
	locale: string,
	toAbsolute: AbsoluteFn = (path) => path,
): Record<string, string> {
	const absolute = toAbsolute(pathname)
	return withXDefault({ [locale]: absolute }, absolute)
}
