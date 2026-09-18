import {
	Section,
	SectionHeader,
	SectionHeaderSubtitle,
	SectionHeaderTitle,
} from '@repo/design-system/components/section'
import { getTranslations } from '@repo/i18n/server'
import { Suspense } from 'react'
import { ProductOverview } from '~/features/product/components/product-overview/product-overview'
import { Cta } from '~/features/site/components/cta'
import {
	Hero,
	HeroContent,
	HeroSubtitle,
	HeroTitle,
} from '~/features/site/components/hero'
import { Testimonials } from '~/features/testimonials/components/testimonials'
import { WorkOverview } from '~/features/work/components/work-overview'

async function WorkHero() {
	const t = await getTranslations('work.page')

	return (
		<Hero>
			<HeroContent>
				<HeroTitle title={t('hero.title')} />
				<HeroSubtitle>{t('hero.subtitle')}</HeroSubtitle>
			</HeroContent>
		</Hero>
	)
}

async function WorkWebdesignSection() {
	const t = await getTranslations('work.page')

	return (
		<>
			<Section>
				<WorkOverview
					tags={['webdesign']}
					header={{
						title: t('webdesign.title'),
						subtitle: t('webdesign.subtitle'),
					}}
				/>
			</Section>
			<Section>
				<Cta
					title={t('webdesign.cta.title')}
					subtitle={t('webdesign.cta.subtitle')}
					link={{
						href: '/contact',
						label: t('webdesign.cta.label'),
					}}
				/>
			</Section>
		</>
	)
}

async function WorkProductsSection() {
	const t = await getTranslations('work.page')

	return (
		<Section>
			<SectionHeader>
				<SectionHeaderTitle>{t('products.title')}</SectionHeaderTitle>
				<SectionHeaderSubtitle>{t('products.subtitle')}</SectionHeaderSubtitle>
			</SectionHeader>
			<ProductOverview />
		</Section>
	)
}

async function WorkBrandingSection() {
	const t = await getTranslations('work.page')

	return (
		<>
			<Section>
				<WorkOverview
					tags={['branding']}
					header={{
						title: t('branding.title'),
						subtitle: t('branding.subtitle'),
					}}
				/>
			</Section>
			<Section>
				<Cta
					title={t('contact.cta.title')}
					subtitle={t('contact.cta.subtitle')}
					link={{
						href: '/contact',
						label: t('webdesign.cta.label'),
					}}
				/>
			</Section>
		</>
	)
}

export async function WorkPageContent() {
	return (
		<>
			<Suspense fallback={null}>
				<WorkHero />
			</Suspense>
			<Suspense fallback={null}>
				<WorkWebdesignSection />
			</Suspense>
			<Suspense fallback={null}>
				<WorkProductsSection />
			</Suspense>
			<Suspense fallback={null}>
				<WorkBrandingSection />
			</Suspense>
			<Suspense fallback={null}>
				<Section>
					<Testimonials filter={{ type: ['client', 'project'] }} />
				</Section>
			</Suspense>
		</>
	)
}
