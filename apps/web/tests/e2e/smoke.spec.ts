import { expect, test } from '@playwright/test'

test('App loads and nav works', async ({ page }) => {
	await page.goto('/')

	await expect(
		page.getByRole('heading', { level: 1, name: 'Nerdfish' }),
	).toBeVisible()

	const nav = page.getByRole('navigation')
	const blogLink = nav.getByRole('link', { name: 'Blog' }).first()
	await blogLink.click()

	// Expects the URL to contain intro.
	await expect(page).toHaveURL(/.*blog/)
})
