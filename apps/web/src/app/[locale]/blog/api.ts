import { tina } from '~/app/cms/client'
import { type Locale } from '~/app/i18n/types'

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
