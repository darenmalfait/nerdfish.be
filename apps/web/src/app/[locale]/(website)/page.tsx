import { InViewBackground } from '@repo/design-system/components/in-view-background'
import {
	Section,
	SectionHeader,
	SectionHeaderSubtitle,
	SectionHeaderTitle,
} from '@repo/design-system/components/section'
import { i18n } from '@repo/i18n/config'
import { getTranslations } from '@repo/i18n/server'
import { type WithLocale } from '@repo/i18n/types'
import { createMetadata } from '@repo/seo/metadata'
import {
	HandPlatterIcon,
	LayoutDashboard,
	MonitorSmartphone,
	Paintbrush2Icon,
} from 'lucide-react'
import { type Metadata } from 'next'
import { Suspense } from 'react'
import { getPathname, getPathnames } from 'routing'
import { BlogOverview } from './blog/components/blog-overview'
import { Testimonials } from '~/features/testimonials'
import { WorkOverview } from './work/components/work-overview'
import { Cta } from '~/features/site/components/cta'
import { Features } from '~/features/site/components/features'
import { Highlights } from '~/features/site/components/highlights'
import { WelcomeHero } from '~/features/site/components/welcome-hero/welcome-hero'

type PageProps = {
	params: Promise<WithLocale>
}

export async function generateMetadata(
	props: PageProps,
): Promise<Metadata | undefined> {
	const { locale } = await props.params
	const t = await getTranslations('home.page')

	const title = t('_meta.title')
	const description = t('_meta.description')

	return createMetadata({
		title,
		description,
		image: '/images/og.png',
		alternates: {
			canonical: getPathname({ locale, href: '/' }),
			languages: getPathnames(
				'/',
				i18n.locales.filter((l) => l !== locale),
			),
		},
		locale,
	})
}

async function HomeFeaturesSection() {
	const t = await getTranslations('home.page')

	return (
		<Section>
			<SectionHeader>
				<SectionHeaderTitle>{t('features.title')}</SectionHeaderTitle>
				<SectionHeaderSubtitle>{t('features.subtitle')}</SectionHeaderSubtitle>
			</SectionHeader>
			<Features
				items={[
					{
						title: 'Web Design',
						description: t('features.webdesign.description'),
						href: '/expertise/webdesign',
						icon: <MonitorSmartphone />,
					},
					{
						title: 'UX/UI Design',
						description: t('features.uxui-design.description'),
						href: '/expertise/uxui-design',
						icon: <LayoutDashboard />,
					},
					{
						title: 'Branding',
						description: t('features.branding.description'),
						href: '/expertise/branding',
						icon: <Paintbrush2Icon />,
					},
					{
						title: 'Javascript Consulting',
						description: t('features.freelance.description'),
						href: '/about',
						icon: <HandPlatterIcon />,
					},
				]}
			/>
		</Section>
	)
}

async function HomeCtaSection() {
	const t = await getTranslations('home.page')

	return (
		<Section>
			<Cta
				title={t('cta.title')}
				subtitle={t('cta.subtitle')}
				link={{ href: '/contact', label: t('cta.action') }}
			/>
		</Section>
	)
}

async function HomeHighlightsSection() {
	const t = await getTranslations('home.page')

	return (
		<Section>
			<SectionHeader>
				<SectionHeaderTitle>{t('highlights.title')}</SectionHeaderTitle>
				<SectionHeaderSubtitle>
					{t('highlights.subtitle')}
				</SectionHeaderSubtitle>
			</SectionHeader>

			<Highlights
				items={[
					{
						id: 'webdesign',
						image: {
							src: '/images/blog/remix-impressions.jpg',
							alt: t('highlights.webdesign.image.alt'),
						},
						category: t('highlights.category'),
						title: t('highlights.webdesign.title'),
						description: t('highlights.webdesign.description'),
						href: '/expertise/webdesign',
					},
					{
						id: 'freelance',
						image: {
							src: '/images/blog/clean-desk-freelance.jpg',
							alt: t('highlights.freelance.image.alt'),
						},
						category: t('highlights.category'),
						title: t('highlights.freelance.title'),
						description: t('highlights.freelance.description'),
						href: '/about',
					},
					{
						id: 'branding',
						image: {
							src: '/images/blog/branding-highlight.jpg',
							alt: t('highlights.branding.image.alt'),
						},
						category: t('highlights.category'),
						title: t('highlights.branding.title'),
						description: t('highlights.branding.description'),
						href: '/expertise/branding',
					},
				]}
			/>
		</Section>
	)
}

async function HomeBlogSection() {
	const t = await getTranslations('home.page')

	return (
		<Section>
			<SectionHeader>
				<SectionHeaderTitle>{t('blog.title')}</SectionHeaderTitle>
				<SectionHeaderSubtitle>{t('blog.subtitle')}</SectionHeaderSubtitle>
			</SectionHeader>
			<BlogOverview count={2} />
		</Section>
	)
}

async function HomeCaseStudySection() {
	const t = await getTranslations('home.page')

	return (
		<Section>
			<SectionHeader>
				<SectionHeaderTitle>{t('caseStudy.title')}</SectionHeaderTitle>
				<SectionHeaderSubtitle>{t('caseStudy.subtitle')}</SectionHeaderSubtitle>
			</SectionHeader>
			<WorkOverview count={1} featuredEnabled tags={['equilibra website']} />
		</Section>
	)
}

export default async function HomePage(props: { params: Promise<WithLocale> }) {
	// need to await this before using getTranslations
	await props.params

	return (
		<>
			{/* Hero chrome paints first; Suspense lets hero i18n + below-fold sections resolve in parallel */}
			<div className="-mt-site-header pt-site-header bg-background-muted relative flex min-h-dvh flex-col justify-center">
				<Suspense
					fallback={
						<div className="bg-background-muted min-h-dvh" aria-hidden />
					}
				>
					<WelcomeHero />
				</Suspense>
			</div>

			<Suspense fallback={null}>
				<HomeFeaturesSection />
			</Suspense>
			<Suspense fallback={null}>
				<HomeCtaSection />
			</Suspense>
			<Suspense fallback={null}>
				<HomeHighlightsSection />
			</Suspense>
			<Suspense fallback={null}>
				<HomeBlogSection />
			</Suspense>
			<Suspense fallback={null}>
				<InViewBackground className="bg-info-background-muted">
					<Section>
						<Testimonials />
					</Section>
				</InViewBackground>
			</Suspense>
			<Suspense fallback={null}>
				<HomeCaseStudySection />
			</Suspense>
		</>
	)
}
