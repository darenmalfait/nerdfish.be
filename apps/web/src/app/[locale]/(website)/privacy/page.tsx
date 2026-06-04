import { Section } from '@repo/design-system/components/section'
import { companyInfo } from '@repo/global-settings/company-info'
import { i18n } from '@repo/i18n/config'
import { getTranslations } from '@repo/i18n/server'
import { type WithLocale } from '@repo/i18n/types'
import { createMetadata } from '@repo/seo/metadata'
import { type Metadata } from 'next'
import { getPathname, getPathnames } from 'routing'
import { Link } from '~/app/[locale]/common/components/link'

type PageProps = {
	params: Promise<WithLocale>
}

export async function generateMetadata(
	props: PageProps,
): Promise<Metadata | undefined> {
	const { locale } = await props.params
	const t = await getTranslations('privacy.page')

	return createMetadata({
		title: t('_meta.title'),
		description: t('_meta.description'),
		alternates: {
			canonical: getPathname({ locale, href: '/privacy' }),
			languages: getPathnames(
				'/privacy',
				i18n.locales.filter((l) => l !== locale),
			),
		},
		locale,
		robots: { index: true, follow: true },
	})
}

export default async function PrivacyPage(props: PageProps) {
	await props.params
	const t = await getTranslations('privacy.page')

	const sections = [
		'controller',
		'data',
		'legalBasis',
		'retention',
		'rights',
	] as const

	return (
		<Section className="py-distant md:py-strangers">
			<article className="typography mx-auto max-w-3xl">
				<h1>{t('title')}</h1>
				<p className="text-foreground-muted">{t('updated')}</p>
				<p>{t('intro')}</p>

				{sections.map((section) => (
					<section key={section} className="typography mt-acquaintances">
						<h2>{t(`sections.${section}.title`)}</h2>
						<p>{t(`sections.${section}.body`)}</p>
					</section>
				))}

				<section className="typography mt-acquaintances">
					<h2>{t('sections.contact.title')}</h2>
					<p>{t('sections.contact.body')}</p>
					<ul>
						<li>
							<strong>{companyInfo.companyName}</strong>
						</li>
						<li>
							<Link href={`mailto:${companyInfo.email}`}>
								{companyInfo.email}
							</Link>
						</li>
						<li>
							{t('sections.contact.vat')}: {companyInfo.vat}
						</li>
					</ul>
				</section>
			</article>
		</Section>
	)
}
