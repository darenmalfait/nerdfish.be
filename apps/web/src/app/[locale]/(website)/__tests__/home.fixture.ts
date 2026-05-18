import { test as base } from '@playwright/test'
import { HomePage } from './home.page'

export * from '@playwright/test'

export const test = base.extend<{ homePage: HomePage }>({
	homePage: async ({ page }, use) => {
		const homePage = new HomePage(page)
		// eslint-disable-next-line react-hooks/rules-of-hooks -- not a hook
		await use(homePage)
	},
})
