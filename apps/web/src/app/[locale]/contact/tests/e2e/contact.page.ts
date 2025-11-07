import { type Locator, type Page } from '@playwright/test'

export class ContactFormPage {
	readonly page: Page
	public readonly form: Locator

	constructor(page: Page) {
		this.page = page
		this.form = page.locator('form')
	}

	submitButton = () => this.form.getByRole('button', { name: 'Submit' })

	// actions
	async goto() {
		await this.page.goto('/contact')
		await this.page.getByRole('button', { name: "Let's get started" }).click()
	}

	async fillForm(
		name: string,
		company: string,
		email: string,
		message: string,
	) {
		await this.form.getByLabel("What's your name?").fill(name)
		await this.form.getByLabel("What's the name of your").fill(company)
		await this.form.getByLabel('Email address').fill(email)
		await this.form.getByText('webdesign').click()
		await this.form.getByLabel('How can I help?').fill(message)
	}

	async submit() {
		await this.submitButton().click()
	}
}
