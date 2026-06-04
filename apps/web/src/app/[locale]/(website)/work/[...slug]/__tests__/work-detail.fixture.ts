import { test as base } from '@playwright/test'
import { WorkDetailPage } from './work-detail.page'

export * from '@playwright/test'

export const test = base.extend<{ workDetailPage: WorkDetailPage }>({
	workDetailPage: async ({ page }, use) => {
		const workDetailPage = new WorkDetailPage(page)
		// eslint-disable-next-line react-hooks/rules-of-hooks -- not a hook
		await use(workDetailPage)
	},
})
