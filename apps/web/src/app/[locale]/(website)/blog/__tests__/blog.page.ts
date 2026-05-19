import { BasePage } from 'playwright/utils/page-object'

export class BlogPage extends BasePage {
	getPageHeading = () =>
		this.page.getByRole('heading', {
			level: 1,
			name: 'Blog',
		})
	getSearchInput = () => this.page.getByRole('searchbox')
	getPostLinks = () => this.page.locator('a[href^="/blog/"]')
	getEmptyState = () => this.page.getByText('No articles found')

	async goto() {
		await this.page.goto('/blog')
	}

	async search(query: string) {
		await this.getSearchInput().fill(query)
	}

	async openFirstPost() {
		await this.getPostLinks().first().click()
	}
}
