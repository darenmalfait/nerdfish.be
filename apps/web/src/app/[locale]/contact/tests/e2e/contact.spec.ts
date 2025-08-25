import { expect } from '@playwright/test'
import { test } from './contact.fixture'

const contactFormData = {
	name: 'John Doe',
	company: 'Nerdfish',
	email: 'john@nerdfish.be',
	message: 'This is testing the form.',
}

test.beforeEach(async ({ contact }) => {
	await contact.goto()
})

test('shows validation errors for empty required fields', async ({
	contact,
}) => {
	await contact.form.getByRole('button', { name: 'Submit' }).click()
	await expect(
		contact.form.getByText('Name must contain at least 2 character(s)'),
	).toBeVisible()
})

test('validates email format', async ({ contact }) => {
	await contact.form.getByLabel('Email address').fill('invalid-email')
	await contact.form.getByRole('button', { name: 'Submit' }).click()
	await expect(contact.form.getByText('Invalid email')).toBeVisible()
})

test('Should submit form', async ({ contact }) => {
	await contact.fillForm(
		contactFormData.name,
		contactFormData.company,
		contactFormData.email,
		contactFormData.message,
	)
	await contact.submit()

	await expect(contact.form.getByText("What's your budget?")).toBeVisible()
	await expect(
		contact.form.getByRole('heading', { name: 'Success' }),
	).toBeVisible()
})
