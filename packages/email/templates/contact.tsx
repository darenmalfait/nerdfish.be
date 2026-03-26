import {
	Body,
	Button,
	Container,
	Head,
	Hr,
	Html,
	Link,
	Preview,
	Row,
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
			<Preview>New contact form submission from {name}</Preview>
			<Body className="bg-gray-100 py-10 font-sans">
				<Container className="mx-auto w-155 max-w-full rounded-xl bg-white px-8 py-10">
					<Section>
						<Text className="m-0 text-xs font-semibold tracking-[1.4px] text-gray-600 uppercase">
							New contact form submission
						</Text>
						<Text className="mt-3 mb-0 text-[32px] leading-[1.2] font-bold text-[#18181b]">
							{name}
						</Text>
						<Text className="mt-3 mb-0 text-base leading-[1.6] text-[#52525b]">
							{email ?? 'No email provided'}
							{company ? ` \u2022 ${company}` : ''}
						</Text>
					</Section>

					<Hr className="my-6 border-gray-200" />

					<Section className="rounded-lg bg-[#fafafa] px-6 py-5">
						<Row>
							<Text className="mt-0 mb-2 text-sm font-semibold tracking-[1.2px] text-gray-600 uppercase">
								Message
							</Text>
							<Text className="m-0 text-base leading-[1.7] whitespace-pre-line text-[#27272a]">
								{message}
							</Text>
						</Row>
					</Section>

					<Section className="mt-6">
						<Text className="mt-0 mb-3 text-sm font-semibold tracking-[1.2px] text-gray-600 uppercase">
							Contact details
						</Text>
						{vatNumber?.length ? (
							<Text className="my-1 text-[15px] leading-normal text-[#3f3f46]">
								VAT number: {vatNumber}
							</Text>
						) : null}
						{phone?.length ? (
							<Text className="my-1 text-[15px] leading-normal text-[#3f3f46]">
								Phone: {phone}
							</Text>
						) : null}
						{projectType?.length ? (
							<Text className="my-1 text-[15px] leading-normal text-[#3f3f46]">
								Interested in: {projectType.join(', ')}
							</Text>
						) : null}
						{budgetRange && projectType?.includes('webdesign') ? (
							<Text className="my-1 text-[15px] leading-normal text-[#3f3f46]">
								Budget range: EUR {budgetRange[0]} - EUR {budgetRange[1]}
							</Text>
						) : null}
					</Section>

					<Section className="mt-8">
						<Button
							className="box-border rounded-md bg-[#18181b] px-6 py-3 text-center text-[15px] font-semibold text-white no-underline"
							href={email ? `mailto:${email}` : 'https://nerdfish.be'}
						>
							Reply to {name}
						</Button>
					</Section>

					<Hr className="my-6 border-gray-200" />

					<Section>
						<Text className="m-0 text-[13px] leading-[1.6] text-gray-600">
							Received via nerdfish contact form.
						</Text>
						<Link
							href="https://nerdfish.be"
							className="text-[13px] leading-[1.6] text-[#52525b] underline"
						>
							Open website
						</Link>
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
