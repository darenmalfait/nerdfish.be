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
import { pageParams } from '@repo/og-utils/zod-params'
import { createMetadata } from '@repo/seo/metadata'
import { Code, Handshake, Monitor, Rocket } from 'lucide-react'
import { type Metadata } from 'next'
import { Suspense } from 'react'
import { getPathname, getPathnames } from 'routing'
import { BlogOverview } from '~/features/blog/components/blog-overview'
import { Toolbox } from './components/toolbox'
import { Link } from '~/features/shared/components/link'
import { Cta } from '~/features/site/components/cta'
import { FaqItem, Faq } from '~/features/site/components/faq'
import { Features } from '~/features/site/components/features'
import {
	Hero,
	HeroContent,
	HeroCTA,
	HeroSubtitle,
	HeroTitle,
} from '~/features/site/components/hero'
import {
	Split,
	SplitContent,
	SplitImage,
} from '~/features/site/components/split'
import { Testimonials } from '~/features/testimonials/components/testimonials'

type PageProps = {
	params: Promise<WithLocale>
}

export async function generateMetadata(
	props: PageProps,
): Promise<Metadata | undefined> {
	const { locale } = await props.params

	const t = await getTranslations('about.page')

	const title = t('_meta.title')
	const description = t('_meta.description')

	return createMetadata({
		title,
		description,
		image: `/api/og?${pageParams.toSearchString({
			heading: title,
		})}`,
		alternates: {
			canonical: getPathname({ locale, href: '/about' }),
			languages: getPathnames(
				'/about',
				i18n.locales.filter((l) => l !== locale),
			),
		},
		locale,
	})
}

async function AboutHero() {
	const t = await getTranslations('about.page')

	return (
		<Hero>
			<HeroContent>
				<HeroTitle title={t('hero.title')} />
				<HeroSubtitle>{t('hero.subtitle')}</HeroSubtitle>
				<HeroCTA href="/contact">{t('hero.cta')}</HeroCTA>
			</HeroContent>
		</Hero>
	)
}

async function AboutProfessionalSection() {
	const t = await getTranslations('about.page')

	return (
		<Section>
			<Split>
				<SplitContent>
					<h2 className="typography-heading">{t('professional.title')}</h2>
					<p className="typography-body">{t('professional.content.first')}</p>
					<p>{t('professional.content.second')}</p>
				</SplitContent>
				<SplitImage
					src="/images/about/avatar.jpg"
					alt={t('professional.image.alt')}
				/>
			</Split>
		</Section>
	)
}

async function AboutFeaturesSection() {
	const t = await getTranslations('about.page')

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
						icon: <Code />,
					},
					{
						title: t('features.items.1.title'),
						description: t('features.items.1.description'),
						icon: <Monitor />,
					},
					{
						title: t('features.items.2.title'),
						description: t('features.items.2.description'),
						icon: <Handshake />,
					},
					{
						title: t('features.items.3.title'),
						description: t('features.items.3.description'),
						icon: <Rocket />,
					},
				]}
			/>
		</Section>
	)
}

async function AboutToolboxSection() {
	const t = await getTranslations('about.page')

	return (
		<Section>
			<SectionHeader>
				<SectionHeaderTitle>{t('my-toolbox.title')}</SectionHeaderTitle>
				<SectionHeaderSubtitle>
					{t('my-toolbox.subtitle')}
				</SectionHeaderSubtitle>
			</SectionHeader>
			<Toolbox />
		</Section>
	)
}

async function AboutPersonalSection() {
	const t = await getTranslations('about.page')

	return (
		<Section>
			<Split>
				<SplitImage
					src="/images/about/daren-cycling.jpg"
					alt={t('personal.image.alt')}
				/>
				<SplitContent>
					<h2 className="typography-heading">{t('personal.title')}</h2>
					<p>{t('personal.content.first')}</p>
					<p>{t('personal.content.second')}</p>
				</SplitContent>
			</Split>
		</Section>
	)
}

async function AboutCtaSection() {
	const t = await getTranslations('about.page')

	return (
		<Section>
			<Cta
				title={t('cta.title')}
				subtitle={t('cta.subtitle')}
				link={{ href: '/contact', label: t('cta.label') }}
			/>
		</Section>
	)
}

async function AboutFaqSection() {
	const t = await getTranslations('about.page')

	return (
		<Section>
			<SectionHeader>
				<SectionHeaderTitle>{t('faq.title')}</SectionHeaderTitle>
				<SectionHeaderSubtitle>{t('faq.subtitle')}</SectionHeaderSubtitle>
			</SectionHeader>
			<Faq defaultValue={['projects']}>
				<FaqItem
					id="projects"
					question={t('faq.items.0.question')}
					answer={t('faq.items.0.answer')}
				/>
				<FaqItem
					id="techstack"
					question={t('faq.items.1.question')}
					answer={t('faq.items.1.answer')}
				/>
				<FaqItem
					id="hire"
					question={t('faq.items.2.question')}
					answer={t('faq.items.2.answer')}
				/>
				<FaqItem
					id="inductires"
					question={t('faq.items.3.question')}
					answer={t('faq.items.3.answer')}
				/>
				<FaqItem
					id="customers"
					question={t('faq.items.4.question')}
					answer={t('faq.items.4.answer')}
				/>
				<FaqItem
					id="quality"
					question={t('faq.items.5.question')}
					answer={t('faq.items.5.answer')}
				/>
				<FaqItem
					id="examples"
					question={t('faq.items.6.question')}
					answer={t('faq.items.6.answer')}
				/>
			</Faq>
		</Section>
	)
}

async function AboutBlogSection() {
	const t = await getTranslations('about.page')

	return (
		<Section>
			<SectionHeader cta={{ url: '/blog', title: t('blog.cta'), as: Link }}>
				<SectionHeaderTitle>{t('blog.title')}</SectionHeaderTitle>
				<SectionHeaderSubtitle>{t('blog.subtitle')}</SectionHeaderSubtitle>
			</SectionHeader>
			<BlogOverview count={2} />
		</Section>
	)
}

export default async function AboutPage(props: PageProps) {
	await props.params

	return (
		<>
			<Suspense fallback={null}>
				<AboutHero />
			</Suspense>
			<Suspense fallback={null}>
				<AboutProfessionalSection />
			</Suspense>
			<Suspense fallback={null}>
				<AboutFeaturesSection />
			</Suspense>
			<Suspense fallback={null}>
				<AboutToolboxSection />
			</Suspense>
			<Suspense fallback={null}>
				<AboutPersonalSection />
			</Suspense>
			<Suspense fallback={null}>
				<AboutCtaSection />
			</Suspense>
			<Suspense fallback={null}>
				<AboutFaqSection />
			</Suspense>
			<Suspense fallback={null}>
				<AboutBlogSection />
			</Suspense>
			<Suspense fallback={null}>
				<InViewBackground className="bg-blog/20">
					<Section>
						<Testimonials
							filter={{
								type: ['colleague', 'client'],
							}}
						/>
					</Section>
				</InViewBackground>
			</Suspense>
		</>
	)
}
