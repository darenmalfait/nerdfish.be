import { Paragraph } from '@nerdfish/ui'
import { generateOGImageUrl, getMetaData } from '@nerdfish-website/seo/metadata'
import { InViewBackground, Section } from '@nerdfish-website/ui/components'
import { type Metadata } from 'next'
import {
	HeroBlock,
	SectionHeader,
	SectionHeaderSubtitle,
	SectionHeaderTitle,
} from '../../common'
import { Chat } from '../contact'
import { type WithLocale } from '~/app/i18n'
import { getDictionary } from '~/app/i18n/get-dictionary'

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
			<HeroBlock variant="secondary" title={dictionary['ai.page.title']}>
				{dictionary['ai.page.description']}
			</HeroBlock>
			<InViewBackground>
				<Section>
					<SectionHeader>
						<SectionHeaderTitle>AI</SectionHeaderTitle>
						<SectionHeaderSubtitle>Beta</SectionHeaderSubtitle>
					</SectionHeader>
					<Paragraph className="mb-lg max-w-3xl font-medium">
						{dictionary['ai.description']}
					</Paragraph>
					<Chat />
				</Section>
			</InViewBackground>
		</>
	)
}
