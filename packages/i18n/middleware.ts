import createMiddleware from 'next-intl/middleware'
import { i18n } from './config'

export const i18nMiddleware = createMiddleware({
	locales: i18n.locales,
	defaultLocale: i18n.defaultLocale,
	localePrefix: 'as-needed',
	localeDetection: true,
	localeCookie: {
		secure: true,
		sameSite: 'strict',
	},
})
