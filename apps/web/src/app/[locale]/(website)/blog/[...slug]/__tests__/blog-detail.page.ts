import { BasePage } from 'playwright/utils/page-object'
import { INVALID_BLOG_POST_PATH } from './blog-detail.builders'

export class BlogDetailPage extends BasePage {
	getArticleHeading = () => this.page.getByRole('heading', { level: 1 })
	getBreadcrumbBlogLink = () =>
		this.page.locator('[data-slot="breadcrumb-link"]', { hasText: 'Blog' })
	getNotFoundHeading = () =>
		this.page.getByRole('heading', { name: "404 - Page doesn't exist" })
	getRelatedPostLinks = () =>
		this.page
			.locator('article')
			.getByRole('list')
			.filter({ has: this.page.locator('a[href^="/blog/"]') })
			.last()
			.locator('a[href^="/blog/"]')

	async goto(path: string) {
		await this.page.goto(path)
	}

	async gotoInvalid(path = INVALID_BLOG_POST_PATH) {
		await this.page.goto(path)
	}
}
