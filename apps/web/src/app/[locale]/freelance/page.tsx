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
import { Faq, FaqItem } from '../../components/faq'
import { Features } from '../../components/features'
import {
	Hero,
	HeroContent,
	HeroSubtitle,
	HeroTitle,
} from '../../components/hero'
import { Keyword, KeywordList } from '../../components/keyword-list'
import { SkillItem, Skills } from '../../components/skills'
import { BlogOverview } from '../blog/components/blog-overview'
import { Testimonials } from '../testimonials/components/testimonials'

type PageProps = {
	params: Promise<WithLocale>
}

export async function generateMetadata(
	props: PageProps,
): Promise<Metadata | undefined> {
	const { locale } = await props.params
	const t = await getTranslations('pages.freelance')

	const title = t('_meta.title')
	const description = t('_meta.description')

	return createMetadata({
		title,
		description,
		image: `/api/og?${pageParams.toSearchString({
			heading: title,
		})}`,
		alternates: {
			canonical: getPathname({ locale, href: '/freelance' }),
			languages: getPathnames(
				'/freelance',
				i18n.locales.filter((l) => l !== locale),
			),
		},
		locale,
	})
}

export default async function FreelancePage(props: {
	params: Promise<WithLocale>
}) {
	await props.params
	const t = await getTranslations('pages.freelance')

	return (
		<>
			<Hero variant="secondary">
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
					<SectionHeaderTitle>{t('blog.title')}</SectionHeaderTitle>
					<SectionHeaderSubtitle>{t('blog.subtitle')}</SectionHeaderSubtitle>
				</SectionHeader>
				<BlogOverview count={2} />
			</Section>

			<Section>
				<KeywordList>
					<Keyword>UX/UI Design</Keyword>
					<Keyword>Git & Github</Keyword>
					<Keyword>Responsive Design</Keyword>
					<Keyword>JavaScript</Keyword>
					<Keyword>Node.js</Keyword>
					<Keyword>TypeScript</Keyword>
					<Keyword>React</Keyword>
				</KeywordList>
			</Section>

			<Section>
				<SectionHeader>
					<SectionHeaderTitle>{t('skills.title')}</SectionHeaderTitle>
					<SectionHeaderSubtitle>{t('skills.subtitle')}</SectionHeaderSubtitle>
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
				<SectionHeader>
					<SectionHeaderTitle>{t('faq.title')}</SectionHeaderTitle>
					<SectionHeaderSubtitle>{t('faq.subtitle')}</SectionHeaderSubtitle>
				</SectionHeader>
				<Faq type="single">
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
					<FaqItem
						question={t('faq.items.5.question')}
						answer={t('faq.items.5.answer')}
					/>
					<FaqItem
						question={t('faq.items.6.question')}
						answer={t('faq.items.6.answer')}
					/>
				</Faq>
			</Section>

			<InViewBackground className="bg-blog/20">
				<Section>
					<Testimonials
						filter={{
							type: ['colleague'],
						}}
					/>
				</Section>
			</InViewBackground>
		</>
	)
}
