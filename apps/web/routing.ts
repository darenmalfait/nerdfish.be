import { i18n } from '@repo/i18n/config'
import {
	type BasePathNames,
	createNavigation,
	defineRouting,
} from '@repo/i18n/routing'
import { type Locale } from '@repo/i18n/types'

export const basePathNames = {
	'/': '/',
	'/3d-printing': '/3d-printing',
	'/ai': '/ai',
	'/about': {
		en: '/about',
		nl: '/over-mij',
	},
	'/blog': '/blog',
	'/branding': '/branding',
	'/contact': '/contact',
	'/freelance': '/freelance',
	'/uxui-design': '/uxui-design',
	'/webdesign': '/webdesign',
	'/wiki': '/wiki',
	'/work': {
		en: '/work',
		nl: '/werk',
	},
	'/schedule-a-meeting': {
		en: '/schedule-a-meeting',
		nl: '/plan-een-meeting',
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

	// template for when it differs per locale
	// '/pathname': {
	// 	en: '/pathname',
	// 	nl: '/padnaam',
	// },
})

export type Pathnames = keyof typeof routing.pathnames

export const { Link, getPathname, redirect, usePathname, useRouter } =
	createNavigation(routing)

export function getPathnames(pathname: Pathnames, locales: Locale[]) {
	return Object.fromEntries(
		locales.map((locale) => [locale, getPathname({ locale, href: pathname })]),
	)
}
