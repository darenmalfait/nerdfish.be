import { Section } from '@repo/design-system/components/section'
import { companyInfo } from '@repo/global-settings/company-info'
import { getTranslations } from '@repo/i18n/server'
import { Link } from '~/features/shared/components/link'

export async function PrivacyPageContent() {
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
