import { BasePage } from 'playwright/utils/page-object'

export class WorkPage extends BasePage {
	getPageHeading = () =>
		this.page.getByRole('heading', {
			level: 1,
			name: 'Projects',
		})
	getProjectLinks = () => this.page.locator('a[href^="/work/"]')

	async goto() {
		await this.page.goto('/work')
	}

	async openFirstProject() {
		await this.getProjectLinks().first().click()
	}
}
