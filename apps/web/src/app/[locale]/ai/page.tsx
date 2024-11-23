import { Paragraph } from '@nerdfish/ui'
import { createMetadata } from '@nerdfish-website/seo/metadata'
import {
	InViewBackground,
	Section,
	SectionHeader,
	SectionHeaderSubtitle,
	SectionHeaderTitle,
} from '@nerdfish-website/ui/components'
import { type Metadata } from 'next'
import { Chat } from '../contact'
import { generateOGImageUrl } from '~/app/api/og'
import { HeroBlock } from '~/app/cms'
import { type WithLocale } from '~/app/i18n'
import { getDictionary } from '~/app/i18n/get-dictionary'

export async function generateMetadata({
	params,
}: {
	params: WithLocale<{}>
}): Promise<Metadata | undefined> {
	const dictionary = await getDictionary(params.locale)
	const title = dictionary['ai.meta.title']

	return createMetadata({
		title,
		description: dictionary['ai.meta.description'],
		image: generateOGImageUrl({
			heading: title,
		}),
		locale: params.locale,
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
					<Chat className="bg-primary rounded-large" />
				</Section>
			</InViewBackground>
		</>
	)
}
