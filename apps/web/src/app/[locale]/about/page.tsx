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
import { Testimonials } from '../testimonials/components/testimonials'
import { Cta } from '~/app/components/cta'
import {
	Hero,
	HeroContent,
	HeroCTA,
	HeroSubtitle,
	HeroTitle,
} from '~/app/components/hero'
import { Link } from '~/app/components/link'
import { SkillItem, Skills } from '~/app/components/skills'
import { Split, SplitContent, SplitImage } from '~/app/components/split'

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
			<Hero variant="secondary">
				<HeroContent>
					<HeroTitle title={t('hero.title')} />
					<HeroSubtitle>{t('hero.subtitle')}</HeroSubtitle>
					<div className="mt-md w-full">
						<HeroCTA href="/contact">{t('hero.cta')}</HeroCTA>
					</div>
				</HeroContent>
			</Hero>
			<Section>
				<Split>
					<SplitContent>
						<h2>{t('professional.title')}</h2>
						<p>{t('professional.content.first')}</p>
						<p>{t('professional.content.second')}</p>
					</SplitContent>
					<SplitImage
						src="/uploads/about/daren-mountains.JPG"
						alt={t('professional.image.alt')}
					/>
				</Split>
			</Section>
			<Section>
				<SectionHeader>
					<SectionHeaderTitle>{t('my-toolbox.title')}</SectionHeaderTitle>
					<SectionHeaderSubtitle>
						{t('my-toolbox.subtitle')}
					</SectionHeaderSubtitle>
				</SectionHeader>
				<Skills>
					<SkillItem skill="javascript" />
					<SkillItem skill="react" />
					<SkillItem skill="node" />
					<SkillItem skill="tailwind" />
					<SkillItem skill="next" />
					<SkillItem skill="sanity" />
					<SkillItem skill="webflow" />
					<SkillItem skill="typescript" />
					<SkillItem skill="vscode" />
					<SkillItem skill="css" />
					<SkillItem skill="html" />
					<SkillItem skill="git" />
					<SkillItem skill="figma" />
				</Skills>
			</Section>
			<Section>
				<Split>
					<SplitImage
						src="/uploads/about/daren-cycling.jpeg"
						alt={t('personal.image.alt')}
					/>
					<SplitContent>
						<h2>{t('personal.title')}</h2>
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
