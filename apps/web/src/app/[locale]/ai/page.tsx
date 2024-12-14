import { InViewBackground } from '@repo/design-system/components/in-view-background'
import {
	Section,
	SectionHeader,
	SectionHeaderSubtitle,
	SectionHeaderTitle,
} from '@repo/design-system/components/section'
import { getTranslations } from '@repo/i18n/server'
import { type WithLocale } from '@repo/i18n/types'
import { pageParams } from '@repo/og-utils/zod-params'
import { createMetadata } from '@repo/seo/metadata'
import { type Metadata } from 'next'
import { Chat } from '../contact/components/chat'
import { HeroBlock } from '~/app/cms/blocks/hero'

export async function generateMetadata(props: {
	params: Promise<WithLocale<{}>>
}): Promise<Metadata | undefined> {
	const params = await props.params
	const t = await getTranslations()
	const title = t('ai.page.meta.title')

	return createMetadata({
		title,
		description: t('ai.page.meta.description'),
		image: `/api/og?${pageParams.toSearchString({
			heading: title,
		})}`,
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
