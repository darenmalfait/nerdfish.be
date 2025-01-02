import { type Locale } from '@repo/i18n/types'
import { allTestimonials, type Testimonial } from 'content-collections'

export const testimonials = {
	getAll: async ({ locale }: { locale?: Locale } = {}) => {
		return allTestimonials.filter((item) =>
			locale ? item.locale === locale : true,
		)
	},

	getLatest: async ({ locale }: { locale?: Locale } = {}): Promise<
		Testimonial | undefined
	> => {
		const latest = allTestimonials.find((item) => item.locale === locale)

		if (!latest) console.warn(`No testimonial found for locale: ${locale}`)

		return latest
	},

	get: async ({ id, locale }: { id: string; locale?: Locale }) => {
		const testimonial = allTestimonials.find(
			(item) => item.id === id && item.locale === locale,
		)

		if (!testimonial)
			console.warn(`No testimonial found with id: ${id} and locale: ${locale}`)

		return testimonial
	},
}
