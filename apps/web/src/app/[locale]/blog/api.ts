import { type Locale } from '@repo/i18n/types'
import { allPosts } from 'content-collections'
import { tina } from '~/app/cms/client'

export const blog = {
	getPosts: async ({ locale }: { locale?: Locale } = {}) => {
		return allPosts
			.filter((item) => (locale ? item.locale === locale : true))
			.sort((a, b) => {
				return new Date(b.date).getTime() - new Date(a.date).getTime()
			})
	},
	getLatestPost: async ({ locale }: { locale?: Locale } = {}) => {
		return allPosts.find((item) => item.locale === locale)?.slug
	},
	getPost: async ({ slug, locale }: { slug: string; locale?: Locale }) => {
		return allPosts.find((item) => item.slug === slug && item.locale === locale)
	},
}

export async function getBlogPosts({ locale }: { locale?: Locale } = {}) {
	const blogListData = await tina.queries.blogConnection()

	return blogListData.data.blogConnection.edges
		?.map((item) => ({
			...item?.node,
		}))
		.filter((item) =>
			locale ? item._sys?.relativePath.startsWith(`${locale}/`) : true,
		)
		.sort((a, b) => {
			if (a.date && b.date) {
				return new Date(b.date).getTime() - new Date(a.date).getTime()
			}

			return 0
		})
}

export async function getBlogPost(relativePath: string) {
	return tina.queries
		.blogPostQuery({
			relativePath,
		})
		.catch(() => null)
}
