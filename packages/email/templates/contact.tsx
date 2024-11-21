import {
	Body,
	Container,
	Head,
	Hr,
	Html,
	Preview,
	Section,
	Tailwind,
	Text,
} from '@react-email/components'

export const ContactEmail = ({
	name,
	email,
	company,
	message,
}: {
	readonly name: string
	readonly email: string
	readonly company?: string
	readonly message: string
}) => (
	<Tailwind>
		<Html>
			<Head />
			<Preview>New email from {name}</Preview>
			<Body className="bg-zinc-50 font-sans">
				<Container className="mx-auto py-12">
					<Section className="mt-8 rounded-md bg-zinc-200 p-px">
						<Section className="rounded-[5px] bg-white p-8">
							<Text className="mb-4 mt-0 text-2xl font-semibold text-zinc-950">
								New email from {name}
							</Text>
							<Text className="m-0 text-zinc-500">
								{name} ({email}){company ? ` from ${company}` : ''} has sent you
								a message:
							</Text>
							<Hr className="my-4" />
							<Text className="m-0 text-zinc-500">{message}</Text>
						</Section>
					</Section>
				</Container>
			</Body>
		</Html>
	</Tailwind>
)

const ContactEmailExample = () => (
	<ContactEmail
		name="Jane Smith"
		email="jane@example.com"
		company="Acme Inc."
		message="Hello, how do I get started?"
	/>
)

export default ContactEmailExample
