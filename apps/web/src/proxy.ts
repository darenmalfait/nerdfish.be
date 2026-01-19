import { authMiddleware } from '@repo/auth/proxy'
import { i18nMiddleware } from '@repo/i18n/middleware'
import { type NextProxy } from 'next/server'
import { pathnames } from 'routing'

const languageMiddleware = i18nMiddleware(pathnames)

// Clerk middleware wraps other middleware in its callback
// For apps using Clerk, compose middleware inside authMiddleware callback
// For apps without Clerk, use createNEMO for composition (see apps/web)
export default authMiddleware((_auth, request) =>
	languageMiddleware(request),
) as unknown as NextProxy

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
