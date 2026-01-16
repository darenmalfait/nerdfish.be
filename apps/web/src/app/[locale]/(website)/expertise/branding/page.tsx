import {
	Section,
	SectionHeader,
	SectionHeaderSubtitle,
	SectionHeaderTitle,
} from '@repo/design-system/components/section'
import { i18n } from '@repo/i18n/config'
import { getTranslations } from '@repo/i18n/server'
import { type WithLocale } from '@repo/i18n/types'
import { pageParams } from '@repo/og-utils/zod-params'
import { createMetadata } from '@repo/seo/metadata'
import { type Metadata } from 'next'
import { getPathname, getPathnames } from 'routing'
import { Features } from '../../components/features'
import {
	Hero,
	HeroContent,
	HeroSubtitle,
	HeroTitle,
} from '../../components/hero'

type PageProps = {
	params: Promise<WithLocale>
}

export async function generateMetadata(
	props: PageProps,
): Promise<Metadata | undefined> {
	const { locale } = await props.params
	const t = await getTranslations('expertise.branding.page')

	const title = t('_meta.title')
	const description = t('_meta.description')

	return createMetadata({
		title,
		description,
		image: `/api/og?${pageParams.toSearchString({
			heading: title,
		})}`,
		alternates: {
			canonical: getPathname({ locale, href: '/expertise/branding' }),
			languages: getPathnames(
				'/expertise/branding',
				i18n.locales.filter((l) => l !== locale),
			),
		},
		locale,
	})
}

export default async function BrandingPage(props: {
	params: Promise<WithLocale>
}) {
	await props.params
	const t = await getTranslations('expertise.branding.page')

	return (
		<>
			<Hero>
				<HeroContent>
					<HeroTitle title={t('hero.title')} />
					<HeroSubtitle>{t('hero.subtitle')}</HeroSubtitle>
				</HeroContent>
			</Hero>

			<Section>
				<SectionHeader>
					<SectionHeaderTitle>{t('features.title')}</SectionHeaderTitle>
					<SectionHeaderSubtitle>
						{t('features.subtitle')}
					</SectionHeaderSubtitle>
				</SectionHeader>
				<Features
					items={[
						{
							title: t('features.items.0.title'),
							description: t('features.items.0.description'),
							icon: 'Palette',
						},
						{
							title: t('features.items.1.title'),
							description: t('features.items.1.description'),
							icon: 'Layers',
						},
						{
							title: t('features.items.2.title'),
							description: t('features.items.2.description'),
							icon: 'Users',
						},
					]}
				/>
			</Section>
		</>
	)
}
