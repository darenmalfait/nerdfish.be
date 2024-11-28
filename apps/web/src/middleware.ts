import { match as matchLocale } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'
import { type NextRequest, NextResponse } from 'next/server'
import { i18n } from './app/i18n'

function getLocale(request: NextRequest): string | undefined {
	// Negotiator expects plain object so we need to transform headers
	const negotiatorHeaders: Record<string, string> = {}
	// biome-ignore lint/suspicious/noAssignInExpressions: ignore this
	request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))

	const locales: string[] = i18n.locales

	// Use negotiator and intl-localematcher to get best locale
	const languages = new Negotiator({ headers: negotiatorHeaders }).languages(
		locales
	)

	const locale = matchLocale(languages, locales, i18n.defaultLocale)

	return locale
}

export function middleware(request: NextRequest) {
	const pathname = request.nextUrl.pathname

	// Check if there is any supported locale in the pathname
	const pathnameIsMissingLocale = i18n.locales.every(
		(locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
	)

	// Redirect if there is no locale
	if (pathnameIsMissingLocale) {
		const locale = getLocale(request)

		// e.g. incoming request is /products
		// The new URL is now /en-US/products
		return NextResponse.redirect(
			new URL(
				`/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`,
				request.url
			)
		)
	}
}

export const config = {
	// Matcher ignoring `/_next/` and `/api/`
	matcher: [
		'/((?!api|_next/static|_next/image|uploads|images|admin|tooling|favicon.ico|sitemap.xml|robots.txt|rss.xml).*)',
	],
}
