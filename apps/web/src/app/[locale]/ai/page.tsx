import { Paragraph } from '@nerdfish/ui'
import { Section } from '@nerdfish-website/ui/components'
import { type Metadata } from 'next'
import {
	generateOGImageUrl,
	getMetaData,
	SectionHeader,
	SectionHeaderSubtitle,
	SectionHeaderTitle,
} from '../../common'
import { BookingBlock } from '../../common/blocks/booking'
import { Chat } from './components/chat'
import { getDictionary } from '~/get-dictionary'
import { type WithLocale } from '~/i18n-config'

export async function generateMetadata({
	params,
}: {
	params: WithLocale<{}>
}): Promise<Metadata | undefined> {
	const dictionary = await getDictionary(params.locale)

	const title = dictionary['ai.meta.title']

	return getMetaData({
		ogImage: generateOGImageUrl({
			heading: title,
		}),
		title,
		url: `/${params.locale}/ai`,
		description: dictionary['ai.meta.description'],
		canonical: `/${params.locale}/ai`,
	})
}

export default async function AiPage({ params }: { params: WithLocale<{}> }) {
	const dictionary = await getDictionary(params.locale)

	return (
		<>
			<Section>
				<SectionHeader>
					<SectionHeaderTitle animatedText="AI" />
					<SectionHeaderSubtitle>Beta</SectionHeaderSubtitle>
				</SectionHeader>
				<Paragraph className="mb-6 max-w-3xl font-medium">
					{dictionary['ai.description']}
				</Paragraph>
				<Chat />
			</Section>
			<BookingBlock
				title={dictionary['ai.booking.title']}
				subtitle={dictionary['ai.booking.subtitle']}
			/>
		</>
	)
}
