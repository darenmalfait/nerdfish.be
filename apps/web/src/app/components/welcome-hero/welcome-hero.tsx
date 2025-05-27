'use client'

import { MagnetButton } from '@repo/design-system/components/magnet'
import { Spotlight } from '@repo/design-system/components/spotlight'
import { Link } from '@repo/design-system/components/ui'
import { ArrowRightIcon } from '@repo/design-system/icons'
import { useTranslations } from '@repo/i18n/client'
import { cx } from 'class-variance-authority'
import { motion } from 'motion/react'
import * as React from 'react'

function GridBackground() {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 1 }}
			className="absolute inset-0 z-0"
			style={{
				backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(125 125 125 / 0.08)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`,
			}}
		/>
	)
}

export function HeroCTA({
	children,
	className,
	...props
}: React.ComponentProps<typeof Link>) {
	return (
		<MagnetButton size="xl" asChild variant="accentuate">
			<Link {...props} className={cx('gap-sm flex items-center', className)}>
				{children}
				<ArrowRightIcon className="text-foreground ml-sm size-6" />
			</Link>
		</MagnetButton>
	)
}

export function WelcomeHero() {
	const t = useTranslations('home.page')

	return (
		<header
			className={cx(
				'bg-secondary shadow-soft-xl p-lg lg:p-xl rounded-container group/hero relative overflow-hidden',
			)}
		>
			<GridBackground />
			<Spotlight />
			<div className={cx('gap-lg relative flex flex-col px-0')}>
				<h1 className="text-foreground font-sans text-4xl font-black leading-none sm:text-[11.6250vw] sm:leading-[11.6250vw] 2xl:text-[12rem] 2xl:leading-[12rem]">
					<div className="font-title bg-[url('/images/blobs.png')] bg-cover !bg-clip-text font-bold !text-transparent [word-spacing:90vw]">
						Hi, I&apos;m Nerdfish
					</div>
				</h1>
				<div className="relative">
					<HeroCTA href="/contact">{t('hero.cta')}</HeroCTA>
				</div>
			</div>
		</header>
	)
}
