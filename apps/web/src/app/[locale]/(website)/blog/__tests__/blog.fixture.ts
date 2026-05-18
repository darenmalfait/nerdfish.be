import { test as base } from '@playwright/test'
import { BlogPage } from './blog.page'

export * from '@playwright/test'

export const test = base.extend<{ blogPage: BlogPage }>({
	blogPage: async ({ page }, use) => {
		const blogPage = new BlogPage(page)
		// eslint-disable-next-line react-hooks/rules-of-hooks -- not a hook
		await use(blogPage)
	},
})
