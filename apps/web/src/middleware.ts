import createMiddleware from 'next-intl/middleware'
import { i18n } from './app/i18n/config'

export const config = {
	// Matcher ignoring `/_next/` and `/api/`
	matcher: [
		'/((?!api|_next/static|_next/image|uploads|images|admin|tooling|favicon.ico|sitemap.xml|robots.txt|rss.xml).*)',
	],
}

export default createMiddleware({
	locales: i18n.locales,
	defaultLocale: i18n.defaultLocale,
	localePrefix: 'as-needed',
	localeDetection: true,
	localeCookie: {
		secure: true,
		sameSite: 'strict',
	},
})
