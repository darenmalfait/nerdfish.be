import { test as base } from '@playwright/test'
import { ContactPage } from './contact.page'
export * from '@playwright/test'

export const test = base.extend<{ contactPage: ContactPage }>({
	contactPage: async ({ page }, use) => {
		const contactPage = new ContactPage(page)
		// eslint-disable-next-line react-hooks/rules-of-hooks -- not a hook
		await use(contactPage)
	},
})
