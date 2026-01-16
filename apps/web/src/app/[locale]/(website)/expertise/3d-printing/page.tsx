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
import { Cta } from '../../components/cta'
import { Faq, FaqItem } from '../../components/faq'
import { Features } from '../../components/features'
import {
	Hero,
	HeroContent,
	HeroSubtitle,
	HeroTitle,
} from '../../components/hero'
import { ImageGrid } from '../../components/image-grid'
import { Pricing } from '../../components/pricing'

type PageProps = {
	params: Promise<WithLocale>
}

export async function generateMetadata(
	props: PageProps,
): Promise<Metadata | undefined> {
	const { locale } = await props.params
	const t = await getTranslations('expertise.3d-printing.page')

	const title = t('_meta.title')
	const description = t('_meta.description')

	return createMetadata({
		title,
		description,
		image: `/api/og?${pageParams.toSearchString({
			heading: title,
		})}`,
		alternates: {
			canonical: getPathname({ locale, href: '/expertise/3d-printing' }),
			languages: getPathnames(
				'/expertise/3d-printing',
				i18n.locales.filter((l) => l !== locale),
			),
		},
		locale,
	})
}

export default async function ThreeDPrintingPage(props: {
	params: Promise<WithLocale>
}) {
	await props.params
	const t = await getTranslations('expertise.3d-printing.page')

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
							icon: 'Zap',
						},
						{
							title: t('features.items.1.title'),
							description: t('features.items.1.description'),
							icon: 'Layers',
						},
						{
							title: t('features.items.2.title'),
							description: t('features.items.2.description'),
							icon: 'Palette',
						},
						{
							title: t('features.items.3.title'),
							description: t('features.items.3.description'),
							icon: 'Leaf',
						},
					]}
				/>
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
				<Faq>
					{Array.from({ length: 7 }).map((_, i) => (
						<FaqItem
							key={i}
							question={t(`faq.items.${i}.question`)}
							answer={t(`faq.items.${i}.answer`)}
						/>
					))}
				</Faq>
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
							features: t('pricing.items.0.features').split('|'),
							href: '/contact',
							buttonText: t('pricing.items.0.buttonText'),
							isPopular: true,
						},
						{
							title: t('pricing.items.1.title'),
							description: t('pricing.items.1.description'),
							features: t('pricing.items.1.features').split('|'),
							href: '/contact',
							buttonText: t('pricing.items.1.buttonText'),
						},
					]}
				/>
			</Section>

			<Section>
				<SectionHeader>
					<SectionHeaderTitle>{t('desk-storage.title')}</SectionHeaderTitle>
					<SectionHeaderSubtitle>
						{t('desk-storage.subtitle')}
					</SectionHeaderSubtitle>
				</SectionHeader>
				<ImageGrid
					items={[
						{
							image: {
								alt: t('desk-storage.items.0.description'),
								src: '/uploads/prints/IMG_2867.jpeg',
							},
						},
						{
							image: {
								alt: t('desk-storage.items.1.description'),
								src: '/uploads/prints/IMG_2864.jpeg',
							},
						},
						{
							image: {
								alt: t('desk-storage.items.2.description'),
								src: '/uploads/prints/IMG_2863.jpeg',
							},
						},
					]}
				/>
			</Section>

			<Section>
				<SectionHeader>
					<SectionHeaderTitle>{t('toys.title')}</SectionHeaderTitle>
					<SectionHeaderSubtitle>{t('toys.subtitle')}</SectionHeaderSubtitle>
				</SectionHeader>
				<ImageGrid
					items={[
						{
							image: {
								alt: t('toys.items.0.description'),
								src: '/uploads/prints/IMG_2835.jpeg',
							},
						},
						{
							image: {
								alt: t('toys.items.1.description'),
								src: '/uploads/prints/IMG_2828.jpeg',
							},
						},
						{
							image: {
								alt: t('toys.items.2.description'),
								src: '/uploads/prints/IMG_2833.jpeg',
							},
						},
						{
							image: {
								alt: t('toys.items.3.description'),
								src: '/uploads/prints/IMG_2836.jpeg',
							},
						},
					]}
				/>
			</Section>

			<Section>
				<SectionHeader>
					<SectionHeaderTitle>{t('misc.title')}</SectionHeaderTitle>
					<SectionHeaderSubtitle>{t('misc.subtitle')}</SectionHeaderSubtitle>
				</SectionHeader>
				<ImageGrid
					items={[
						{
							image: {
								alt: t('misc.items.0.description'),
								src: '/uploads/prints/IMG_2815.jpeg',
							},
						},
						{
							image: {
								alt: t('misc.items.1.description'),
								src: '/uploads/prints/IMG_2830.jpeg',
							},
						},
						{
							image: {
								alt: t('misc.items.2.description'),
								src: '/uploads/prints/IMG_2852.jpeg',
							},
						},
					]}
				/>
			</Section>
		</>
	)
}
