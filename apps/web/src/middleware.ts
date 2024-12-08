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
		if (request.headers.get('x-nonce') != null) {
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
			request.headers.set(
				'Content-Security-Policy',
				contentSecurityPolicyHeaderValue,
			)

			const response = await next(request, _next)
			if (response) {
				response.headers.set(
					'Content-Security-Policy',
					contentSecurityPolicyHeaderValue,
				)
				response.headers.set('x-nonce', nonce)
			}

			return response
		} else {
			return next(request, _next)
		}
	}
}

export const config = {
	// Matcher ignoring `/_next/` and `/api/`
	matcher: [
		'/((?!api|_next/static|_next/image|uploads|images|admin|favicon.ico|sitemap.xml|robots.txt|rss.xml).*)',
	],
}

const middlewares = [withIntl, withCSP]
export default stackMiddlewares(middlewares)
