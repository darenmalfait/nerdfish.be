import { type Locale } from '@repo/i18n/types'

export const ContactPath: {
	[key in Locale]: string
} = {
	en: '/contact',
	nl: '/nl/contact',
}
