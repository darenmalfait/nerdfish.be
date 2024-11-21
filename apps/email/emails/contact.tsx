import { ContactEmail } from '@nerdfish-website/email/templates/contact'

const ExampleContactEmail = () => (
	<ContactEmail
		name="Jane Smith"
		email="jane.smith@example.com"
		company="Acme Inc."
		message="I'm interested in your services."
	/>
)

export default ExampleContactEmail
