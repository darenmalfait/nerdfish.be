import { Paragraph } from '@nerdfish/ui'
import { Section } from '@nerdfish-website/ui/components'
import { Header } from '../common'
import { Chat } from './components/chat'

export default function AiPage() {
	return (
		<Section>
			<Header className="mb-3" title="AI" subtitle="Beta" />
			<Paragraph className="mb-6 font-medium">
				Disclaimer: This is not actually me, but AI. Answers might be
				inaccurate.
			</Paragraph>
			<Chat />
		</Section>
	)
}
