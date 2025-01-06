import { expect, test } from '@playwright/test'

const contactFormData = {
	name: 'John Doe',
	company: 'Nerdfish',
	email: 'john@nerdfish.be',
	message: 'This is testing the form.',
}

test.beforeEach(async ({ page }) => {
	await page.goto('/contact')
	await page.getByRole('button', { name: "Let's get started" }).click()
})

test('shows validation errors for empty required fields', async ({ page }) => {
	await page.getByRole('button', { name: 'Submit' }).click()
	await expect(
		page.getByText('Name must contain at least 2 character(s)'),
	).toBeVisible()
})

test('validates email format', async ({ page }) => {
	await page.getByLabel('Email address').fill('invalid-email')
	await page.getByRole('button', { name: 'Submit' }).click()
	await expect(page.getByText('Invalid email')).toBeVisible()
})

test('Should submit form', async ({ page }) => {
	await page.getByLabel("What's your name?*").fill(contactFormData.name)
	await page.getByLabel("What's the name of your").fill(contactFormData.company)
	await page.getByLabel('Email address').fill(contactFormData.email)

	await page.getByText('webdesign').click()
	await expect(page.getByText("What's your budget?")).toBeVisible()

	await page.getByLabel('How can I help?*').fill(contactFormData.message)

	await page.getByRole('button', { name: 'Submit' }).click()

	await expect(page.getByRole('heading', { name: 'Success' })).toBeVisible()
})
