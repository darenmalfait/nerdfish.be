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
