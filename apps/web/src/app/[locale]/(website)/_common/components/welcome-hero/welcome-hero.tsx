import { getTranslations } from '@repo/i18n/server'
import { WelcomeHeroContent } from './welcome-hero-content'

export async function WelcomeHero() {
	const t = await getTranslations('home.page')

	return (
		<WelcomeHeroContent
			subtitle={t('hero.subtitle')}
			ctaLabel={t('hero.cta')}
		/>
	)
}
