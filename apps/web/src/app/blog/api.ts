import {tina, type Blog, type BlogPostQueryQuery} from '../cms'

export async function getBlogPosts() {
  const blogListData = await tina.queries.blogConnection()

  return blogListData.data.blogConnection.edges?.map(item => ({
    ...item?.node,
  }))
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
