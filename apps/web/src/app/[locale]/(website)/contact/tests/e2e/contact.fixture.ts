import { test as base } from '@playwright/test'
import { ContactFormPage } from './contact.page'
export * from '@playwright/test'

export const test = base.extend<{ contact: ContactFormPage }>({
	contact: async ({ page }, use) => {
		const contactFormPage = new ContactFormPage(page)
		// eslint-disable-next-line react-hooks/rules-of-hooks -- not a hook
		await use(contactFormPage)
	},
})
