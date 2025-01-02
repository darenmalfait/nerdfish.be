import { type Locale } from '@repo/i18n/types'
import { allTestimonials } from 'content-collections'

export const testimonials = {
	getAll: async ({ locale }: { locale?: Locale } = {}) => {
		return allTestimonials.filter((item) =>
			locale ? item.locale === locale : true,
		)
	},
	getLatest: async ({ locale }: { locale?: Locale } = {}) => {
		return allTestimonials.find((item) => item.locale === locale)
	},
	get: async ({ id, locale }: { id: string; locale?: Locale }) => {
		return allTestimonials.find(
			(item) => item.id === id && item.locale === locale,
		)
	},
}
