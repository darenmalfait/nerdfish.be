import { ContactEmail } from '@repo/email/templates/contact'

const ExampleContactEmail = () => (
	<ContactEmail
		name="Jane Smith"
		email="jane.smith@example.com"
		company="Acme Inc."
		message="I'm interested in your services."
		phone="123-456-7890"
	/>
)

export default ExampleContactEmail
