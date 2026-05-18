export type ContactFormTestData = {
	name: string
	company: string
	email: string
	message: string
}

export function mockContactFormData(
	overrides?: Partial<ContactFormTestData>,
): ContactFormTestData {
	return {
		name: 'John Doe',
		company: 'Nerdfish',
		email: 'john@nerdfish.be',
		message: 'This is testing the form.',
		...overrides,
	}
}
