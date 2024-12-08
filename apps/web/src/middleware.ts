import {
	type NextFetchEvent,
	type NextMiddleware,
	type NextRequest,
	NextResponse,
} from 'next/server'
import { withIntl } from './app/i18n/middleware'
import { type MiddlewareFactory } from './app/types'

function stackMiddlewares(
	functions: MiddlewareFactory[] = [],
	index = 0,
): NextMiddleware {
	const current = functions[index]
	if (current) {
		const next = stackMiddlewares(functions, index + 1)
		return current(next)
	}
	return () => NextResponse.next()
}

const withCSP: MiddlewareFactory = (next: NextMiddleware) => {
	return async (request: NextRequest, _next: NextFetchEvent) => {
		const nonce = Buffer.from(crypto.randomUUID()).toString('base64')

		const cspHeader = `
    		default-src 'self';
    		script-src 'self' 'nonce-${nonce}' 'strict-dynamic';
    		style-src 'self' 'nonce-${nonce}';
    		img-src 'self' blob: data:;
    		font-src 'self';
    		object-src 'none';
    		base-uri 'self';
    		form-action 'self';
    		frame-ancestors 'none';
    		upgrade-insecure-requests;
			`
		// Replace newline characters and spaces
		const contentSecurityPolicyHeaderValue = cspHeader
			.replace(/\s{2,}/g, ' ')
			.trim()

		const requestHeaders = new Headers(request.headers)
		requestHeaders.set('x-nonce', nonce)

		requestHeaders.set(
			'Content-Security-Policy',
			contentSecurityPolicyHeaderValue,
		)

		const response = await next(request, _next)

		response?.headers.set(
			'Content-Security-Policy',
			contentSecurityPolicyHeaderValue,
		)

		return response
	}
}

export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - api (API routes)
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 * - public folders
		 * - sitemap.xml
		 * - robots.txt
		 */
		{
			source:
				'/((?!api|_next/static|_next/image|uploads|images|admin|favicon.ico|sitemap.xml|robots.txt).*)',
			missing: [
				{ type: 'header', key: 'next-router-prefetch' },
				{ type: 'header', key: 'purpose', value: 'prefetch' },
			],
		},
	],
}

export default stackMiddlewares([withIntl, withCSP])
