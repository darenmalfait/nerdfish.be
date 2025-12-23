import { i18nMiddleware } from '@repo/i18n/middleware'
import { pathnames } from 'routing'

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

const middleware = i18nMiddleware(pathnames)

export default middleware
