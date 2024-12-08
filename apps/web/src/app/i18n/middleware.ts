import { type NextFetchEvent, type NextRequest } from 'next/server'
import createMiddleware from 'next-intl/middleware'
import { type MiddlewareFactory } from '../types'
import { i18n } from './config'

export const withIntl: MiddlewareFactory = (next) => {
	return async (request: NextRequest, _next: NextFetchEvent) => {
		const response = createMiddleware({
			locales: i18n.locales,
			defaultLocale: i18n.defaultLocale,
			localePrefix: 'as-needed',
			localeDetection: true,
		})(request)

		// If intlMiddleware has handled the request (redirect, response, etc.)
		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
		if (response) return response

		// Otherwise, continue with the next middleware in the stack
		return next(request, _next)
	}
}
