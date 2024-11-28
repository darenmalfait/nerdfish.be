import 'server-only'

import { type Locale, i18n } from '~/app/i18n'

export type Dictionary = {
	'ai.chat.initialMessage': string
	'ai.premadeQuestions.currentJob': string
	'ai.premadeQuestions.currentJobQuestion': string
	'ai.premadeQuestions.experience': string
	'ai.premadeQuestions.experienceQuestion': string
	'ai.premadeQuestions.favoriteLanguage': string
	'ai.premadeQuestions.favoriteLanguageQuestion': string
	'ai.premadeQuestions.whoAreYou': string
	'ai.premadeQuestions.whoAreYouQuestion': string
	'ai.booking.subtitle': string
	'ai.booking.title': string
	'ai.description': string
	'ai.meta.description': string
	'ai.meta.title': string
	'ai.page.description': string
	'ai.page.title': string
	'blog.related.title': string
	'blog.related.subtitle': string
	'contact.booking.title': string
	'contact.dataUsage': string
	'contact.company': string
	'contact.email': string
	'contact.phone': string
	'contact.contactInformation': string
	'contact.fieldset.customer': string
	'contact.fieldset.message': string
	'contact.fieldset.project': string
	'contact.genericError': string
	'contact.message': string
	'contact.name': string
	'contact.projectType': string
	'contact.projectTypeDescription': string
	'contact.budgetRange': string
	'contact.budgetRangeDescription': string
	'contact.recaptchaError': string
	'contact.send': string
	'contact.success': string
	'theme.dark': string
	'theme.light': string
	'theme.system': string
	'features.readMore': string
	'global.about': string
	'global.allArticles': string
	'global.readMore': string
	'global.vat': string
	'global.switchLanguage': string
	'work.related.title': string
	'work.related.subtitle': string
}

// We enumerate all dictionaries here for better linting and typescript support
// We also get the default import for cleaner types
const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
	en: () =>
		import('../../../dictionaries/en.json').then(
			(module) => module.default as Dictionary
		),
	nl: () =>
		import('../../../dictionaries/nl.json').then(
			(module) => module.default as Dictionary
		),
}

export const getDictionary = async (locale: Locale): Promise<Dictionary> => {
	const dict = dictionaries[locale]?.() ?? dictionaries[i18n.defaultLocale]?.()
	if (!dict) throw new Error('Dictionary not found')

	return dict
}
