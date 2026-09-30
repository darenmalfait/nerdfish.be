import { i18n, localeCookie } from '@repo/i18n/config'
import {
	type BasePathNames,
	createNavigation,
	defineRouting,
} from '@repo/i18n/routing'
import { type Locale } from '@repo/i18n/types'

export const basePathNames = {
	'/': '/',
	'/about': {
		en: '/about',
		nl: '/over-mij',
	},
	'/blog': '/blog',
	'/contact': '/contact',
	'/privacy': {
		en: '/privacy',
		nl: '/privacybeleid',
	},
	'/expertise/3d-printing': '/expertise/3d-printing',
	'/expertise/branding': '/expertise/branding',
	'/expertise/uxui-design': '/expertise/uxui-design',
	'/expertise/webdesign': '/expertise/webdesign',
	'/wiki': '/wiki',
	'/work': {
		en: '/work',
		nl: '/werk',
	},
} satisfies BasePathNames<typeof i18n.locales>

export const pathnames = {
	...basePathNames,
	'/blog/:slug': '/blog/:slug',
	'/tooling/*': '/tooling/*',
	'/work/:slug': '/work/:slug',
} satisfies BasePathNames<typeof i18n.locales>

export const routing = defineRouting({
	locales: i18n.locales,
	defaultLocale: i18n.defaultLocale,
	localePrefix: 'as-needed',
	pathnames,
	localeCookie,

	// template for when it differs per locale
	// '/pathname': {
	// 	en: '/pathname',
	// 	nl: '/padnaam',
	// },
})

export type Pathnames = keyof typeof routing.pathnames

export const { Link, getPathname, redirect, usePathname, useRouter } =
	createNavigation(routing)

/** Absolute or relative language map including self-ref + x-default for hreflang. */
export function getAlternateLanguages(
	pathname: Pathnames,
	options?: {
		locales?: readonly Locale[]
		toAbsolute?: (pathname: string) => string
	},
): Record<string, string> {
	const locales = options?.locales ?? i18n.locales
	const toAbsolute = options?.toAbsolute ?? ((value: string) => value)

	const languages: Record<string, string> = Object.fromEntries(
		locales.map((locale) => [
			locale,
			toAbsolute(getPathname({ locale, href: pathname })),
		]),
	)

	const defaultPath = languages[i18n.defaultLocale]
	if (!defaultPath) {
		throw new Error(`Missing default locale path for ${pathname}`)
	}

	languages['x-default'] = defaultPath

	return languages
}
