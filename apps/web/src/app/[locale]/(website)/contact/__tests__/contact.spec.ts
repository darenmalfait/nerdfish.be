import { expect } from '@playwright/test'
import { mockContactFormData } from './contact-form.builders'
import { test } from './contact.fixture'

test.describe('User Story: As a user, I want to submit the contact form', () => {
	test.describe('Given the user is on the contact page', () => {
		test.beforeEach(async ({ contactPage }) => {
			await contactPage.goto()
		})

		test.describe('When I open the contact form', () => {
			test.beforeEach(async ({ contactPage }) => {
				await contactPage.openForm()
			})

			test('it should show the contact form', async ({ contactPage }) => {
				await expect(contactPage.form.getForm()).toBeVisible()
			})

			test.describe('When I submit without filling required fields', () => {
				test.beforeEach(async ({ contactPage }) => {
					await contactPage.form.submit()
				})

				test('it should mark required fields as invalid', async ({
					contactPage,
				}) => {
					await expect(contactPage.form.getNameInput()).toHaveAttribute(
						'aria-invalid',
						'true',
					)
				})
			})

			test.describe('When I submit with an invalid email', () => {
				test.beforeEach(async ({ contactPage }) => {
					await contactPage.form.getEmailInput().fill('invalid-email')
					await contactPage.form.submit()
				})

				test('it should mark the email field as invalid', async ({
					contactPage,
				}) => {
					await expect(contactPage.form.getEmailInput()).toHaveAttribute(
						'aria-invalid',
						'true',
					)
				})
			})

			test.describe('When I select the webdesign option', () => {
				test.beforeEach(async ({ contactPage }) => {
					await contactPage.form.getWebdesignOption().click()
				})

				test('it should show the budget field', async ({ contactPage }) => {
					await expect(contactPage.form.getBudgetField()).toBeVisible()
				})
			})

			test.describe('When I complete the form with valid data', () => {
				test.beforeEach(async ({ contactPage }) => {
					await contactPage.form.fill(mockContactFormData())
				})

				test.describe('When I submit the form', () => {
					test.beforeEach(async ({ contactPage }) => {
						await contactPage.form.submit()
					})

					test('it should show a success alert', async ({ contactPage }) => {
						await expect(contactPage.getSuccessAlert()).toBeVisible()
					})
				})
			})
		})
	})
})
