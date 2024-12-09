import createMiddleware from 'next-intl/middleware'
import { i18n } from './app/i18n/config'

export const config = {
	/*
	 * Match all request paths except for the ones starting with:
	 * - api (API routes)
	 * - _next/static (static files)
	 * - _next/image (image optimization files)
	 * - favicon.ico (favicon file)
	 * - folders in public (which resolve to /foldername)
	 * - sitemap.xml
	 * - robots.txt
	 */
	matcher: [
		'/((?!api|_next/static|_next/image|uploads|images|admin|favicon.ico|sitemap.xml|robots.txt).*)',
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
