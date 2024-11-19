import { tina } from '../../cms'
import { type Locale } from '~/app/i18n'

export async function getBlogPosts({ locale }: { locale?: Locale } = {}) {
	const blogListData = await tina.queries.blogConnection()

	return blogListData.data.blogConnection.edges
		?.map((item) => ({
			...item?.node,
		}))
		.filter((item) =>
			locale ? item._sys?.relativePath.startsWith(`${locale}/`) : true,
		)
		.reverse()
}

export async function getBlogPost(relativePath: string) {
	return tina.queries
		.blogPostQuery({
			relativePath,
		})
		.catch(() => null)
}
