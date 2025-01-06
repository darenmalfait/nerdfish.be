import createMiddleware from 'next-intl/middleware'
import { i18n } from './config'
import { type BasePathNames } from './routing'

export const i18nMiddleware = (
	pathnames: BasePathNames<typeof i18n.locales> = {},
) =>
	createMiddleware({
		pathnames,
		locales: i18n.locales,
		defaultLocale: i18n.defaultLocale,
		localePrefix: 'as-needed',
		localeDetection: true,
		localeCookie: {
			secure: true,
			sameSite: 'strict',
		},
	})
