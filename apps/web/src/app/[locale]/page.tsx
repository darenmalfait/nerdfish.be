import { InViewBackground } from '@repo/design-system/components/in-view-background'
import {
	Section,
	SectionHeader,
	SectionHeaderSubtitle,
	SectionHeaderTitle,
} from '@repo/design-system/components/section'
import { Paragraph } from '@repo/design-system/components/ui'
import { i18n } from '@repo/i18n/config'
import { getTranslations } from '@repo/i18n/server'
import { type WithLocale } from '@repo/i18n/types'
import { createMetadata } from '@repo/seo/metadata'
import { type Metadata } from 'next'
import { getPathname, getPathnames } from 'routing'
import { Cta } from '../components/cta'
import { Features } from '../components/features'
import {
	Hero,
	HeroContent,
	HeroCTA,
	HeroImage,
	HeroSubtitle,
	HeroTitle,
} from '../components/hero'
import { Highlights } from '../components/highlights'
import { BlogOverview } from './blog/components/blog-overview'
import { Testimonials } from './testimonials/components/testimonials'
import { WorkOverview } from './work/components/work-overview'

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
		image: '/uploads/og.png',
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

export default async function HomePage(props: { params: Promise<WithLocale> }) {
	// need to await this before using getTranslations
	await props.params
	const t = await getTranslations('home.page')

	return (
		<>
			<Hero>
				<HeroImage
					src="/uploads/nerdy-fish-no-bg_tlt9pd.png"
					alt={t('hero.image.alt')}
				/>
				<HeroContent>
					<HeroTitle title="nerdfish" />
					<HeroSubtitle>{t('hero.subtitle')}</HeroSubtitle>
					<Paragraph className="!mt-sm">{t('hero.content')}</Paragraph>
					<div className="mt-lg w-full">
						<HeroCTA href="/contact">{t('hero.cta')}</HeroCTA>
					</div>
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
							title: 'Web Design',
							description: t('features.webdesign.description'),
							href: '/expertise/webdesign',
							icon: 'MonitorSmartphone',
						},
						{
							title: 'UX/UI Design',
							description: t('features.uxui-design.description'),
							href: '/expertise/uxui-design',
							icon: 'LayoutDashboard',
						},
						{
							title: 'Branding',
							description: t('features.branding.description'),
							href: '/expertise/branding',
							icon: 'Paintbrush2Icon',
						},
						{
							title: 'Javascript Consulting',
							description: t('features.freelance.description'),
							href: '/expertise/freelance',
							icon: 'HandPlatterIcon',
						},
					]}
				/>
			</Section>
			<Section>
				<Cta
					title={t('cta.title')}
					subtitle={t('cta.subtitle')}
					link={{ href: '/contact', label: t('cta.action') }}
				/>
			</Section>
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
								src: '/uploads/blog/web-developer-purple-bg.png',
								alt: 'Someone painting on a canvas',
							},
							category: 'Expertise',
							title: 'Professional Website Development',
							excerpt:
								'Transform your ideas into visually stunning, user-friendly websites that perfectly reflect your brand and engage your target audience.',
							href: '/expertise/webdesign',
						},
						{
							id: 'freelance',
							image: {
								src: '/uploads/blog/clean-desk-freelance.png',
								alt: 'Man working at a laptop, freelance style',
							},
							category: 'Expertise',
							title: 'Freelance Services',
							excerpt:
								'Offering expert React and TypeScript consulting to build high-quality, scalable web applications tailored to your needs.',
							href: '/expertise/freelance',
						},
						{
							id: 'branding',
							image: {
								src: '/uploads/projects/nerdfish-ui.png',
								alt: 'Stylized branding materials like logos and business cards',
							},
							category: 'Expertise',
							title: 'Branding',
							excerpt:
								'From designing logos to creating digital graphics, I deliver creative, detail-oriented branding solutions that elevate your business.',
							href: '/expertise/branding',
						},
					]}
				/>
			</Section>
			<Section>
				<SectionHeader>
					<SectionHeaderTitle>{t('blog.title')}</SectionHeaderTitle>
					<SectionHeaderSubtitle>{t('blog.subtitle')}</SectionHeaderSubtitle>
				</SectionHeader>
				<BlogOverview count={2} />
			</Section>
			<InViewBackground className="bg-blog/20">
				<Section>
					<Testimonials />
				</Section>
			</InViewBackground>
			<Section>
				<SectionHeader>
					<SectionHeaderTitle>{t('caseStudy.title')}</SectionHeaderTitle>
					<SectionHeaderSubtitle>
						{t('caseStudy.subtitle')}
					</SectionHeaderSubtitle>
				</SectionHeader>
				<WorkOverview count={1} featuredEnabled tags={['equilibra website']} />
			</Section>
		</>
	)
}
