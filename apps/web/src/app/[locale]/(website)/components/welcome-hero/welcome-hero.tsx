import { MagnetButton } from '@repo/design-system/components/magnet'
import { SectionHeaderTitle } from '@repo/design-system/components/section'
import { ArrowRightIcon } from '@repo/design-system/icons'
import { useTranslations } from '@repo/i18n/client'
import { cn } from '@repo/lib/utils/class'
import { type ComponentProps } from 'react'
import { Hero, HeroContent, HeroSubtitle } from '../hero'
import { Link } from '~/app/[locale]/common/components/link'

export function HeroCTA({
	children,
	className,
	...props
}: ComponentProps<typeof Link>) {
	return (
		<MagnetButton
			size="xl"
			variant="default"
			className="hover:bg-background-inverted/80!"
			render={
				<Link
					{...props}
					className={cn('gap-best-friends flex items-center', className)}
				>
					{children}
					<ArrowRightIcon className="ml-best-friends size-6" />
				</Link>
			}
		/>
	)
}

export function WelcomeHero() {
	const t = useTranslations('home.page')

	return (
		<Hero>
			<HeroContent>
				<SectionHeaderTitle as="h1">
					{t('hero.title.line1')} <br />
					<span className="from-foreground/80 via-foreground to-accent bg-linear-to-br bg-clip-text text-transparent">
						{t('hero.title.line2')}
					</span>
					<br />
					{t('hero.title.line3')}
				</SectionHeaderTitle>
				<HeroSubtitle>{t('contact.subtitle')}</HeroSubtitle>
				<div className="md:item-center gap-friends mt-acquaintances flex flex-col items-center justify-center md:flex-row md:items-start md:justify-start">
					<MagnetButton
						size="xl"
						variant="accent"
						className="hover:bg-background-inverted/80!"
						render={<Link href="/contact">{t('cta.action')}</Link>}
					/>
				</div>
			</HeroContent>
		</Hero>
	)
}
