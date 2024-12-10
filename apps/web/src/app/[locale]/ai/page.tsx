import { InViewBackground } from '@repo/design-system/components/in-view-background'
import {
	Section,
	SectionHeader,
	SectionHeaderSubtitle,
	SectionHeaderTitle,
} from '@repo/design-system/components/section'
import { createMetadata } from '@repo/seo/metadata'
import { type Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { Chat } from '../contact/components/chat'
import { generateOGImageUrl } from '~/app/api/og/utils'
import { HeroBlock } from '~/app/cms/blocks/hero'
import { type WithLocale } from '~/app/i18n/types'

export async function generateMetadata({
	params,
}: {
	params: WithLocale<{}>
}): Promise<Metadata | undefined> {
	const t = await getTranslations()
	const title = t('ai.page.meta.title')

	return createMetadata({
		title,
		description: t('ai.page.meta.description'),
		image: generateOGImageUrl({
			heading: title,
		}),
		locale: params.locale,
	})
}

export default async function AiPage() {
	const t = await getTranslations()

	return (
		<>
			<HeroBlock variant="secondary" title={t('ai.page.title')}>
				{t('ai.page.description')}
			</HeroBlock>
			<InViewBackground>
				<Section>
					<SectionHeader>
						<SectionHeaderTitle>AI</SectionHeaderTitle>
						<SectionHeaderSubtitle>
							{t('contact.chat.disclaimer')}
						</SectionHeaderSubtitle>
					</SectionHeader>

					<div className="relative">
						<Chat className="rounded-container bg-primary p-lg shadow-outline h-[75vh]" />
					</div>
				</Section>
			</InViewBackground>
		</>
	)
}
