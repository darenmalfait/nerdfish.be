import { type Locale } from '@repo/i18n/types'
import { allProducts } from 'content-collections'

export const product = {
	getAll: async ({ locale }: { locale?: Locale } = {}) => {
		return allProducts.filter((item) =>
			locale ? item.locale === locale : true,
		)
	},
	get: async ({ slug, locale }: { slug: string; locale?: Locale }) => {
		return allProducts.find(
			(item) => item.slug === slug && item.locale === locale,
		)
	},
}
