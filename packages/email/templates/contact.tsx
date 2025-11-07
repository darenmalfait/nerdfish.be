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
	phone,
	company,
	message,
	budgetRange,
	vatNumber,
	projectType,
}: {
	readonly name: string
	readonly email?: string
	readonly phone?: string
	readonly company?: string
	readonly message: string
	readonly budgetRange?: number[]
	readonly projectType?: string[]
	readonly vatNumber?: string
}) => (
	<Tailwind>
		<Html>
			<Head />
			<Preview>New email from {name}</Preview>
			<Body className="bg-zinc-50 font-sans">
				<Container className="mx-auto py-12">
					<Section className="mt-8 rounded-md bg-zinc-200 p-px">
						<Section className="rounded-[5px] bg-white p-8">
							<Text className="mt-0 mb-4 text-2xl font-semibold text-zinc-950">
								New email from {name}
							</Text>
							<Text className="m-0 text-zinc-500">
								{name} {email ? `(${email})` : ''}
								{company ? ` from ${company}` : ''} has sent you a message:
							</Text>
							{vatNumber?.length ? (
								<Text className="mt-4 text-zinc-500">
									VAT number: {vatNumber}
								</Text>
							) : null}
							{phone?.length ? (
								<Text className="mt-4 text-zinc-500">Phone: {phone}</Text>
							) : null}
							{projectType?.length ? (
								<Text className="mt-4 text-zinc-500">
									Interested in: {projectType.join(', ')}
								</Text>
							) : null}
							{budgetRange && projectType?.includes('webdesign') ? (
								<Text className="mt-2 text-zinc-500">
									Budget range: € {budgetRange[0]} - € {budgetRange[1]}
								</Text>
							) : null}
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
