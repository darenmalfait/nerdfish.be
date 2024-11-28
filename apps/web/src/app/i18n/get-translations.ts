import 'server-only'
import type { Dictionary, Locale } from '~/app/i18n/types'

export const getTranslations = async (locale: Locale): Promise<Dictionary> => {
	const common = await import(`./dictionaries/${locale}.json`).then(
		(module) => module.default
	)

	if (!common) throw new Error('Dictionary not found')

	return {
		...common,
	}
}
