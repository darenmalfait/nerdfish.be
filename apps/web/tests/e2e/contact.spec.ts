import { expect, test } from '@playwright/test'

test('App loads and nav works', async ({ page }) => {
	await page.goto('/contact')

	await page.getByRole('button', { name: 'Let’s get started' }).click()

	await page.getByLabel("What's your name?*").fill('John Doe')
	await page.getByLabel("What's the name of your").fill('Nerdfish')
	await page.getByLabel('Email address').fill('john@nerdfish.be')

	await page.getByText('webdesign').click()
	await expect(page.getByText("What's your budget?A")).toBeVisible()

	await page.getByLabel('How can I help?*').fill('This is testing the form.')

	await page.getByRole('button', { name: 'Submit' }).click()

	await expect(page.getByRole('heading', { name: 'Success' })).toBeVisible()
})
