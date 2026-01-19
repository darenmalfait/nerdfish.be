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
import { type Metadata } from 'next'
import { getPathname, getPathnames } from 'routing'
import { BlogOverview } from '../blog/components/blog-overview'
import { Cta } from '../components/cta'
import { FaqItem, Faq } from '../components/faq'
import { Features } from '../components/features'
import {
	Hero,
	HeroContent,
	HeroCTA,
	HeroSubtitle,
	HeroTitle,
} from '../components/hero'
import { Split, SplitContent, SplitImage } from '../components/split'
import { Testimonials } from '../testimonials/components/testimonials'
import { Toolbox } from './components/toolbox'
import { Link } from '~/app/[locale]/common/components/link'

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

export default async function AboutPage(props: PageProps) {
	await props.params
	const t = await getTranslations('about.page')

	return (
		<>
			<Hero>
				<HeroContent>
					<HeroTitle title={t('hero.title')} />
					<HeroSubtitle>{t('hero.subtitle')}</HeroSubtitle>
					<HeroCTA href="/contact">{t('hero.cta')}</HeroCTA>
				</HeroContent>
			</Hero>
			<Section>
				<Split>
					<SplitContent>
						<h2 className="typography-heading">{t('professional.title')}</h2>
						<p className="typography-body">{t('professional.content.first')}</p>
						<p>{t('professional.content.second')}</p>
					</SplitContent>
					<SplitImage
						src="/uploads/about/avatar.jpg"
						alt={t('professional.image.alt')}
					/>
				</Split>
			</Section>
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
							icon: 'LucideCode',
						},
						{
							title: t('features.items.1.title'),
							description: t('features.items.1.description'),
							icon: 'LucideMonitor',
						},
						{
							title: t('features.items.2.title'),
							description: t('features.items.2.description'),
							icon: 'LucideHandshake',
						},
						{
							title: t('features.items.3.title'),
							description: t('features.items.3.description'),
							icon: 'LucideRocket',
						},
					]}
				/>
			</Section>
			<Section>
				<SectionHeader>
					<SectionHeaderTitle>{t('my-toolbox.title')}</SectionHeaderTitle>
					<SectionHeaderSubtitle>
						{t('my-toolbox.subtitle')}
					</SectionHeaderSubtitle>
				</SectionHeader>
				<Toolbox />
			</Section>
			<Section>
				<Split>
					<SplitImage
						src="/uploads/about/daren-cycling.jpg"
						alt={t('personal.image.alt')}
					/>
					<SplitContent>
						<h2 className="typography-heading">{t('personal.title')}</h2>
						<p>{t('personal.content.first')}</p>
						<p>{t('personal.content.second')}</p>
					</SplitContent>
				</Split>
			</Section>
			<Section>
				<Cta
					title={t('cta.title')}
					subtitle={t('cta.subtitle')}
					link={{ href: '/contact', label: t('cta.label') }}
				/>
			</Section>
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
			<Section>
				<SectionHeader cta={{ url: '/blog', title: t('blog.cta'), as: Link }}>
					<SectionHeaderTitle>{t('blog.title')}</SectionHeaderTitle>
					<SectionHeaderSubtitle>{t('blog.subtitle')}</SectionHeaderSubtitle>
				</SectionHeader>
				<BlogOverview count={2} />
			</Section>

			<InViewBackground className="bg-blog/20">
				<Section>
					<Testimonials
						filter={{
							type: ['colleague', 'client'],
						}}
					/>
				</Section>
			</InViewBackground>
		</>
	)
}
