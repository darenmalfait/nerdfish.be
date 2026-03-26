import { ContactEmail } from '@repo/email/templates/contact'

const ExampleContactEmail = () => (
	<ContactEmail
		name="Jane Smith"
		email="jane.smith@example.com"
		company="Acme Inc."
		message="I'm interested in your services."
		phone="123-456-7890"
		projectType={['webdesign', 'development']}
		budgetRange={[1000, 10000]}
		vatNumber="BE1234567890"
	/>
)

export default ExampleContactEmail
