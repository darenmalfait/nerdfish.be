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
import { Suspense } from 'react'
import { getPathname, getPathnames } from 'routing'
import { ProductOverview } from '../product/components/product-overview/product-overview'
import { Testimonials } from '../testimonials/components/testimonials'
import { WorkOverview } from './components/work-overview'
import {
	Hero,
	HeroContent,
	HeroSubtitle,
	HeroTitle,
	Cta,
} from '~/features/site'

type PageProps = {
	params: Promise<WithLocale>
}

export async function generateMetadata(
	props: PageProps,
): Promise<Metadata | undefined> {
	const { locale } = await props.params

	const t = await getTranslations('work.page')

	const title = t('_meta.title')
	const description = t('_meta.description')

	return createMetadata({
		title,
		description,
		image: `/api/og?${pageParams.toSearchString({
			heading: title,
		})}`,
		alternates: {
			canonical: getPathname({ locale, href: '/work' }),
			languages: getPathnames(
				'/work',
				i18n.locales.filter((l) => l !== locale),
			),
		},
		locale,
	})
}

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

export default async function WorkPage(props: PageProps) {
	await props.params

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
