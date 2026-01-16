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
import { BlogOverview } from '../../blog/components/blog-overview'
import { Cta } from '../../components/cta'
import { Faq, FaqItem } from '../../components/faq'
import { Features } from '../../components/features'
import {
	Hero,
	HeroContent,
	HeroSubtitle,
	HeroTitle,
} from '../../components/hero'
import { Keyword, KeywordList } from '../../components/keyword-list'
import { Pricing } from '../../components/pricing'

type PageProps = {
	params: Promise<WithLocale>
}

export async function generateMetadata(
	props: PageProps,
): Promise<Metadata | undefined> {
	const { locale } = await props.params
	const t = await getTranslations('expertise.uxui-design.page')

	const title = t('_meta.title')
	const description = t('_meta.description')

	return createMetadata({
		title,
		description,
		image: `/api/og?${pageParams.toSearchString({
			heading: title,
		})}`,
		alternates: {
			canonical: getPathname({ locale, href: '/expertise/uxui-design' }),
			languages: getPathnames(
				'/expertise/uxui-design',
				i18n.locales.filter((l) => l !== locale),
			),
		},
		locale,
	})
}

export default async function UXUIDesignPage(props: {
	params: Promise<WithLocale>
}) {
	await props.params
	const t = await getTranslations('expertise.uxui-design.page')

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
					layout={{
						maxCols: '3',
						variant: 'default',
					}}
					items={[
						{
							title: t('features.items.3.title'),
							description: t('features.items.3.description'),
							icon: 'Lightbulb',
						},
						{
							title: t('features.items.0.title'),
							description: t('features.items.0.description'),
							icon: 'Layout',
						},
						{
							title: t('features.items.2.title'),
							description: t('features.items.2.description'),
							icon: 'LineChart',
						},
					]}
				/>
			</Section>

			<Section>
				<SectionHeader>
					<SectionHeaderTitle>{t('blog.title')}</SectionHeaderTitle>
					<SectionHeaderSubtitle>{t('blog.subtitle')}</SectionHeaderSubtitle>
				</SectionHeader>
				<BlogOverview count={2} tags={['ux', 'ui']} />
			</Section>

			<Section>
				<KeywordList>
					<Keyword>UX</Keyword>
					<Keyword>UI</Keyword>
					<Keyword>Design</Keyword>
					<Keyword>Usability</Keyword>
					<Keyword>Interface</Keyword>
				</KeywordList>
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
					<SectionHeaderTitle>{t('pricing.title')}</SectionHeaderTitle>
					<SectionHeaderSubtitle>{t('pricing.subtitle')}</SectionHeaderSubtitle>
				</SectionHeader>
				<Pricing
					plans={[
						{
							title: t('pricing.items.0.title'),
							description: t('pricing.items.0.description'),
							price: 'TBD',
							features: [
								t('pricing.items.0.features.1'),
								t('pricing.items.0.features.2'),
								t('pricing.items.0.features.3'),
							],
							href: '/contact',
							buttonText: t('pricing.items.0.cta'),
						},
						{
							title: t('pricing.items.1.title'),
							description: t('pricing.items.1.description'),
							price: 'TBD',
							features: [
								t('pricing.items.1.features.1'),
								t('pricing.items.1.features.2'),
								t('pricing.items.1.features.3'),
								t('pricing.items.1.features.4'),
							],
							href: '/contact',
							buttonText: t('pricing.items.1.cta'),
						},
						{
							title: t('pricing.items.2.title'),
							description: t('pricing.items.2.description'),
							price: 'TBD',
							features: [
								t('pricing.items.2.features.0'),
								t('pricing.items.2.features.1'),
								t('pricing.items.2.features.2'),
							],
							href: '/contact',
							buttonText: t('pricing.items.2.cta'),
						},
					]}
				/>
			</Section>

			<Section>
				<SectionHeader>
					<SectionHeaderTitle>{t('faq.title')}</SectionHeaderTitle>
					<SectionHeaderSubtitle>{t('faq.subtitle')}</SectionHeaderSubtitle>
				</SectionHeader>
				<Faq>
					<FaqItem
						question={t('faq.items.0.question')}
						answer={t('faq.items.0.answer')}
					/>
					<FaqItem
						question={t('faq.items.1.question')}
						answer={t('faq.items.1.answer')}
					/>
					<FaqItem
						question={t('faq.items.2.question')}
						answer={t('faq.items.2.answer')}
					/>
					<FaqItem
						question={t('faq.items.3.question')}
						answer={t('faq.items.3.answer')}
					/>
					<FaqItem
						question={t('faq.items.4.question')}
						answer={t('faq.items.4.answer')}
					/>
				</Faq>
			</Section>
		</>
	)
}
