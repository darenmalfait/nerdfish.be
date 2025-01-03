import { type Locale } from '@repo/i18n/types'
import { allPosts } from 'content-collections'

export const blog = {
	getAll: async ({ locale }: { locale?: Locale } = {}) => {
		return allPosts
			.filter((item) => (locale ? item.locale === locale : true))
			.sort((a, b) => {
				return new Date(b.date).getTime() - new Date(a.date).getTime()
			})
	},
	getLatest: async ({ locale }: { locale?: Locale } = {}) => {
		return allPosts.find((item) => item.locale === locale)?.slug
	},
	get: async ({ slug, locale }: { slug: string; locale?: Locale }) => {
		return allPosts.find((item) => item.slug === slug && item.locale === locale)
	},
}
