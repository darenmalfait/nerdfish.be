import { BasePage } from 'playwright/utils/page-object'
import { INVALID_WORK_PROJECT_PATH } from './work-detail.builders'

export class WorkDetailPage extends BasePage {
	getProjectTitle = () => this.page.getByRole('heading', { level: 4 })
	getVisitWebsiteLink = () =>
		this.page.getByRole('link', { name: 'Visit website' })
	getNotFoundHeading = () =>
		this.page.getByRole('heading', { name: "404 - Page doesn't exist" })
	getRelatedProjectLinks = () =>
		this.page.locator('main').locator('a[href^="/work/"]:not([href="/work"])')

	async goto(path: string) {
		await this.page.goto(path)
	}

	async gotoInvalid(path = INVALID_WORK_PROJECT_PATH) {
		await this.page.goto(path)
	}
}
