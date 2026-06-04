import { test as base } from '@playwright/test'
import { BlogDetailPage } from './blog-detail.page'

export * from '@playwright/test'

export const test = base.extend<{ blogDetailPage: BlogDetailPage }>({
	blogDetailPage: async ({ page }, use) => {
		const blogDetailPage = new BlogDetailPage(page)
		// eslint-disable-next-line react-hooks/rules-of-hooks -- not a hook
		await use(blogDetailPage)
	},
})
