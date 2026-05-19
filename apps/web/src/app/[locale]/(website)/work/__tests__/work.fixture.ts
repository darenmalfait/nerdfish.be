import { test as base } from '@playwright/test'
import { WorkPage } from './work.page'

export * from '@playwright/test'

export const test = base.extend<{ workPage: WorkPage }>({
	workPage: async ({ page }, use) => {
		const workPage = new WorkPage(page)
		// eslint-disable-next-line react-hooks/rules-of-hooks -- not a hook
		await use(workPage)
	},
})
