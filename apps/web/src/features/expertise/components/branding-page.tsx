import {
	Section,
	SectionHeader,
	SectionHeaderSubtitle,
	SectionHeaderTitle,
} from '@repo/design-system/components/section'
import { getTranslations } from '@repo/i18n/server'
import { Layers, Palette, Users } from 'lucide-react'
import { Suspense } from 'react'
import { Features } from '~/features/site/components/features'
import {
	Hero,
	HeroContent,
	HeroSubtitle,
	HeroTitle,
} from '~/features/site/components/hero'

async function BrandingHero() {
	const t = await getTranslations('expertise.branding.page')

	return (
		<Hero>
			<HeroContent>
				<HeroTitle title={t('hero.title')} />
				<HeroSubtitle>{t('hero.subtitle')}</HeroSubtitle>
			</HeroContent>
		</Hero>
	)
}

async function BrandingFeaturesSection() {
	const t = await getTranslations('expertise.branding.page')

	return (
		<Section>
			<SectionHeader>
				<SectionHeaderTitle>{t('features.title')}</SectionHeaderTitle>
				<SectionHeaderSubtitle>{t('features.subtitle')}</SectionHeaderSubtitle>
			</SectionHeader>
			<Features
				items={[
					{
						title: t('features.items.0.title'),
						description: t('features.items.0.description'),
						icon: <Palette />,
					},
					{
						title: t('features.items.1.title'),
						description: t('features.items.1.description'),
						icon: <Layers />,
					},
					{
						title: t('features.items.2.title'),
						description: t('features.items.2.description'),
						icon: <Users />,
					},
				]}
			/>
		</Section>
	)
}

export async function BrandingPageContent() {
	return (
		<>
			<Suspense fallback={null}>
				<BrandingHero />
			</Suspense>
			<Suspense fallback={null}>
				<BrandingFeaturesSection />
			</Suspense>
		</>
	)
}
