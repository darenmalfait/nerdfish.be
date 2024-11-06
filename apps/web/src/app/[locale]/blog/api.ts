import { tina, type Blog, type BlogPostQueryQuery } from '../../cms'
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

export function mapBlogData(data: BlogPostQueryQuery) {
	return {
		...data,
		blogs: data.blogConnection.edges?.map((item: any) => ({
			...(item?.node ?? {}),
		})) as Blog[],
	}
}

export async function getBlogPost(relativePath: string) {
	const blog = await tina.queries
		.blogPostQuery({
			relativePath,
		})
		.catch(() => null)

	if (!blog) return null

	return {
		...blog,
		data: mapBlogData(blog.data),
	}
}
