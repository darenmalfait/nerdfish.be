export const supportedLanguages = [
	{
		code: 'en',
		label: 'English',
		default: true,
	},
	{
		code: 'nl',
		label: 'Nederlands',
		default: false,
	},
] as const

export const i18n = {
	locales: supportedLanguages.map((l) => l.code),
	defaultLocale: supportedLanguages.find((l) => l.default)?.code ?? 'en',
} as const

/** Shared by middleware + createNavigation so client/server cookie writes match */
export const localeCookie = {
	// Secure cookies are dropped on http://localhost, which breaks
	// localePrefix: 'as-needed' (default locale redirects bounce via Accept-Language)
	secure: process.env.NODE_ENV === 'production',
	sameSite: 'lax' as const,
}
