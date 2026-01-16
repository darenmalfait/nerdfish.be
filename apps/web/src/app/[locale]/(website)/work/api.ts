import { type Locale } from '@repo/i18n/types'
import { allProjects } from 'content-collections'

export const work = {
	getAll: async ({ locale }: { locale?: Locale } = {}) => {
		return allProjects
			.filter((item) => (locale ? item.locale === locale : true))
			.sort((a, b) => {
				return new Date(b.date).getTime() - new Date(a.date).getTime()
			})
	},
	getLatest: async ({ locale }: { locale?: Locale } = {}) => {
		return allProjects.find((item) => item.locale === locale)?.slug
	},
	get: async ({ slug, locale }: { slug: string; locale?: Locale }) => {
		return allProjects.find(
			(item) => item.slug === slug && item.locale === locale,
		)
	},
}
