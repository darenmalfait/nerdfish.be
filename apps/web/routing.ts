import { i18n } from '@repo/i18n/config'
import { createNavigation, defineRouting } from '@repo/i18n/routing'

export const routing = defineRouting({
	locales: i18n.locales,
	defaultLocale: i18n.defaultLocale,
	localePrefix: 'as-needed',
	pathnames: {
		'/': '/',
		'/3d-printing': '/3d-printing',
		'/about': {
			en: '/about',
			nl: '/over-mij',
		},
		'/blog': '/blog',
		'/blog/:slug': '/blog/:slug',
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
		'/work/:slug': '/work/:slug',

		// template for when it differs per locale
		// '/pathname': {
		// 	en: '/pathname',
		// 	nl: '/padnaam',
		// },
	},
})

export type Pathnames = keyof typeof routing.pathnames

export const { Link, getPathname, redirect, usePathname, useRouter } =
	createNavigation(routing)
