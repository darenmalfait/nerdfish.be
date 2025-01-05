import { i18n } from '@repo/i18n/config'
import { createNavigation, defineRouting } from '@repo/i18n/routing'

export const routing = defineRouting({
	locales: i18n.locales,
	defaultLocale: i18n.defaultLocale,
	localePrefix: 'as-needed',
	pathnames: {
		'/': '/',
		'/webdesign': '/webdesign',
		'/uxui-design': '/uxui-design',
		'/branding': '/branding',
		'/freelance': '/freelance',
		'/contact': '/contact',

		// template for when it differs per locale
		// '/webdesign': {
		// 	en: '/webdesign',
		// 	nl: '/webdesign',
		// },
	},
})

export type Pathnames = keyof typeof routing.pathnames

export const { Link, getPathname, redirect, usePathname, useRouter } =
	createNavigation(routing)
