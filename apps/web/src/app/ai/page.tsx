import { Paragraph } from '@nerdfish/ui'
import { Section } from '@nerdfish-website/ui/components'
import { type Metadata } from 'next'
import { generateOGImageUrl, getMetaData, Header } from '../common'
import { Chat } from './components/chat'

export async function generateMetadata(): Promise<Metadata | undefined> {
	const title = 'Nerdfish - Daren Malfait AI'

	return getMetaData({
		ogImage: generateOGImageUrl({
			heading: title,
		}),
		title,
		url: '/ai',
		description: 'Ask Daren Malfait anything',
		canonical: '/ai',
	})
}

export default function AiPage() {
	return (
		<Section>
			<Header className="mb-3" title="AI" subtitle="Beta" />
			<Paragraph className="mb-6 max-w-3xl font-medium">
				Disclaimer: This is not actually me, but AI. Answers might be highly
				inaccurate, Since this is mostly an experiment, I&apos;m also using a
				free tier of the AI, so it might not always work.
			</Paragraph>
			<Chat />
		</Section>
	)
}
