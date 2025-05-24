'use client'

import { MagnetButton } from '@repo/design-system/components/magnet'
import { Link } from '@repo/design-system/components/ui'
import { ArrowRightIcon } from '@repo/design-system/icons'
import { useTranslations } from '@repo/i18n/client'
import { cx } from 'class-variance-authority'
import * as React from 'react'

export function HeroCTA({
	children,
	className,
	...props
}: React.ComponentProps<typeof Link>) {
	return (
		<MagnetButton size="lg" asChild>
			<Link {...props} className={cx('flex items-center', className)}>
				{children}
				<ArrowRightIcon className="text-inverted ml-sm size-4" />
			</Link>
		</MagnetButton>
	)
}

export function WelcomeHero() {
	const t = useTranslations('home.page')

	return (
		<header className="bg-muted p-lg lg:p-xl rounded-container group/hero">
			<div className={cx('gap-lg relative flex flex-col px-0')}>
				<h1 className="text-foreground font-sans text-4xl font-black leading-none sm:text-[11.6250vw] sm:leading-[11.6250vw] 2xl:text-[12rem] 2xl:leading-[12rem]">
					<div className="bg-[url('/images/blobs.png')] bg-cover !bg-clip-text !uppercase !text-transparent [word-spacing:90vw]">
						Hi I&apos;m Nerdfish
					</div>
				</h1>
				<div className="relative">
					<HeroCTA href="/contact">{t('hero.cta')}</HeroCTA>
				</div>
			</div>
		</header>
	)
}
