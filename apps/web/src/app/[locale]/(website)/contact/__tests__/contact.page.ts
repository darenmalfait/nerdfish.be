import { type Page } from '@playwright/test'
import { BasePage } from 'playwright/utils/page-object'
import { type ContactFormTestData } from './contact-form.builders'

class ContactFormComponent {
	constructor(private readonly page: Page) {}

	getForm = () => this.page.locator('form')

	getNameInput = () => this.getForm().getByLabel("What's your name?")
	getCompanyInput = () => this.getForm().getByLabel("What's the name of your")
	getEmailInput = () => this.getForm().getByLabel('Email address')
	getMessageInput = () => this.getForm().getByLabel('How can I help?')
	getWebdesignOption = () => this.getForm().locator('label[for="webdesign"]')
	getBudgetField = () => this.getForm().getByRole('slider').first()
	getSubmitButton = () => this.getForm().getByRole('button', { name: 'Submit' })

	async fill(data: ContactFormTestData) {
		await this.getNameInput().fill(data.name)
		await this.getCompanyInput().fill(data.company)
		await this.getEmailInput().fill(data.email)
		await this.getMessageInput().fill(data.message)
	}

	async submit() {
		await this.getSubmitButton().click()
	}
}

export class ContactPage extends BasePage {
	readonly form: ContactFormComponent

	constructor(page: Page) {
		super(page)
		this.form = new ContactFormComponent(page)
	}

	getOpenFormButton = () =>
		this.page.getByRole('button', { name: "Let's get started" })
	getSuccessAlert = () =>
		this.page.getByRole('alert').filter({ hasText: 'Success' })

	async goto() {
		await this.page.goto('/contact')
	}

	async openForm() {
		await this.getOpenFormButton().click()
	}
}
