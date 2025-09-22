import { InViewBackground } from '@repo/design-system/components/in-view-background'
import {
	SectionHeader,
	SectionHeaderSubtitle,
	SectionHeaderTitle,
	Section,
} from '@repo/design-system/components/section'
import { i18n } from '@repo/i18n/config'
import { getTranslations } from '@repo/i18n/server'
import { type WithLocale } from '@repo/i18n/types'
import { pageParams } from '@repo/og-utils/zod-params'
import { createMetadata } from '@repo/seo/metadata'
import { type Metadata } from 'next'
import { Chat } from './components/chat'
import {
	Hero,
	HeroTitle,
	HeroContent,
	HeroSubtitle,
} from '~/app/components/hero'
import { getPathname, getPathnames } from '~/routing'

type PageProps = {
	params: Promise<WithLocale>
}

export async function generateMetadata(
	props: PageProps,
): Promise<Metadata | undefined> {
	const { locale } = await props.params
	const t = await getTranslations('ai.page')

	const title = t('_meta.title')
	const description = t('_meta.description')

	return createMetadata({
		title,
		description,
		image: `/api/og?${pageParams.toSearchString({
			heading: title,
		})}`,
		alternates: {
			canonical: getPathname({ locale, href: '/ai' }),
			languages: getPathnames(
				'/ai',
				i18n.locales.filter((l) => l !== locale),
			),
		},
		locale,
	})
}

export default async function AiPage(props: PageProps) {
	await props.params
	const t = await getTranslations('ai.page')

	return (
		<>
			<Hero>
				<HeroContent>
					<HeroTitle title={t('title')} />
					<HeroSubtitle>{t('description')}</HeroSubtitle>
				</HeroContent>
			</Hero>
			<InViewBackground>
				<Section>
					<SectionHeader>
						<SectionHeaderTitle>AI</SectionHeaderTitle>
						<SectionHeaderSubtitle>{t('disclaimer')}</SectionHeaderSubtitle>
					</SectionHeader>

					<div className="relative">
						<Chat className="rounded-container bg-background p-lg shadow-outline h-[75vh]" />
					</div>
				</Section>
			</InViewBackground>
		</>
	)
}
