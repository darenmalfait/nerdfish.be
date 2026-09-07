import { SectionHeaderTitle } from '@repo/design-system/components/section'
import { getTranslations } from '@repo/i18n/server'
import { Hero, HeroContent, HeroSubtitle } from '../hero'
import { DiaTextReveal } from './dia-text'
import { WelcomeHeroContactButton } from './welcome-hero-cta'

export async function WelcomeHero() {
	const t = await getTranslations('home.page')
	const heroWords = [
		t('hero.title.line4.0'),
		t('hero.title.line4.1'),
		t('hero.title.line4.2'),
		t('hero.title.line4.3'),
	]

	return (
		<Hero className="py-casual md:py-casual relative z-1 w-full">
			<HeroContent className="text-center">
				<SectionHeaderTitle as="h1" className="mx-auto leading-snug">
					<span className="from-foreground/80 via-foreground to-background-secondary bg-linear-to-br bg-clip-text text-transparent">
						{t('hero.title.line1')}
					</span>{' '}
					<br />
					<span className="bg-accent text-accent-contrast rounded-compact p-bff">
						{t('hero.title.line2')}
					</span>
					<br />
					{t('hero.title.line3')}{' '}
					<DiaTextReveal fixedWidth repeat repeatDelay={3} text={heroWords} />
				</SectionHeaderTitle>
				<HeroSubtitle className="text-foreground mx-auto">
					{t('hero.subtitle')}
				</HeroSubtitle>
				<div className="mt-acquaintances flex justify-center">
					<WelcomeHeroContactButton label={t('cta.action')} />
				</div>
			</HeroContent>
		</Hero>
	)
}
