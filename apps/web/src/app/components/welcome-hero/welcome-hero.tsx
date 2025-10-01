'use client'

import { MagnetButton } from '@repo/design-system/components/magnet'
import { Section } from '@repo/design-system/components/section'
import { Link } from '@repo/design-system/components/ui'
import { ArrowRightIcon } from '@repo/design-system/icons'
import { useTranslations } from '@repo/i18n/client'
import { cx } from 'class-variance-authority'
import { motion } from 'motion/react'
import { type ComponentProps, useRef } from 'react'
import { AuroraBackground } from './aurora-bg'

export function HeroCTA({
	children,
	className,
	...props
}: ComponentProps<typeof Link>) {
	return (
		<MagnetButton
			size="lg"
			asChild
			variant="default"
			className="hover:!bg-background-inverted/80"
		>
			<Link {...props} className={cx('gap-sm flex items-center', className)}>
				{children}
				<ArrowRightIcon className="ml-sm size-6" />
			</Link>
		</MagnetButton>
	)
}

export function WelcomeHero() {
	const containerRef = useRef<HTMLDivElement>(null)
	const t = useTranslations('home.page')

	return (
		<AuroraBackground>
			<Section className="!py-lg">
				<motion.header
					ref={containerRef}
					className={cx('group/hero relative overflow-hidden bg-transparent')}
				>
					{/* <GridBackground /> */}
					{/* <Spotlight /> */}
					<div className={cx('gap-lg relative flex flex-col px-0')}>
						<h1 className="text-foreground font-sans text-6xl font-black leading-none sm:text-[11.6250vw] sm:leading-[11.6250vw] 2xl:text-[12rem] 2xl:leading-[12rem]">
							<div className="font-title bg-[url('/images/blobs.png')] bg-cover !bg-clip-text font-bold !text-transparent [word-spacing:90vw]">
								Hi, I&apos;m Nerdfish
							</div>
						</h1>
						<div className="relative">
							<HeroCTA href="/contact">{t('hero.cta')}</HeroCTA>
						</div>
					</div>
				</motion.header>
			</Section>
		</AuroraBackground>
	)
}
