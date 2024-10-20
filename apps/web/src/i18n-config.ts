export const supportedLanguages = [
	{
		code: 'en',
		label: 'English',
		default: true,
	},
	{
		code: 'nl',
		label: 'Nederlands',
	},
]

export const i18n = {
	locales: supportedLanguages.map((l) => l.code),
	defaultLocale: supportedLanguages.find((l) => l.default)?.code ?? 'en',
} as const

export type Locale = (typeof i18n)['locales'][number]

export type WithLocale<T> = T & { locale: Locale }
