import { stripPreSlash } from '@repo/lib/utils/string'
import { type Navigation } from '~/features/site/hooks/use-navigation'

/** Top-level nav targets (e.g. /about) — used to avoid double-active sub links. */
export function getTopLevelNavHrefs(main: Navigation['main']): Set<string> {
	const hrefs = new Set<string>()

	for (const item of main) {
		if (!item.href) continue
		hrefs.add(stripPreSlash(item.href))
	}

	return hrefs
}

function pathMatches(pathname: string, href: string): boolean {
	const path = stripPreSlash(pathname)
	const target = stripPreSlash(href)

	if (!target) return false

	return path === target || path.startsWith(`${target}/`)
}

export function isTopLevelNavItemActive(
	pathname: string,
	href: string,
): boolean {
	return pathMatches(pathname, href)
}

export function isSubNavItemActive(
	pathname: string,
	href: string,
	topLevelHrefs: Set<string>,
): boolean {
	const target = stripPreSlash(href)

	if (!target) return false
	if (topLevelHrefs.has(target)) return false

	return pathMatches(pathname, href)
}

export function getActiveMainNavLabel(
	main: Navigation['main'],
	pathname: string,
): string {
	const topLevelHrefs = getTopLevelNavHrefs(main)

	const topLevelMatch = main.find(
		(item) => item.href && isTopLevelNavItemActive(pathname, item.href),
	)
	if (topLevelMatch) return topLevelMatch.label

	const subMenuMatch = main.find((item) =>
		item.sub?.some((subItem) =>
			isSubNavItemActive(pathname, subItem.href, topLevelHrefs),
		),
	)

	return subMenuMatch?.label ?? 'home'
}
