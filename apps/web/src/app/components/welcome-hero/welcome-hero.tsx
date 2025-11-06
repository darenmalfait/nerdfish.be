'use client'

import { MagnetButton } from '@repo/design-system/components/magnet'
import { Section } from '@repo/design-system/components/section'
import { ArrowRightIcon } from '@repo/design-system/icons'
import { useTranslations } from '@repo/i18n/client'
import { cx } from 'class-variance-authority'
import { motion } from 'motion/react'
import { type ComponentProps, useRef } from 'react'
import { Link } from '~/app/components/link'

export function HeroCTA({
	children,
	className,
	...props
}: ComponentProps<typeof Link>) {
	return (
		<MagnetButton
			size="xl"
			variant="default"
			className="hover:!bg-background-inverted/80"
			render={
				<Link
					{...props}
					className={cx('gap-best-friends flex items-center', className)}
				>
					{children}
					<ArrowRightIcon className="ml-best-friends size-6" />
				</Link>
			}
		/>
	)
}

export function WelcomeHero() {
	const containerRef = useRef<HTMLDivElement>(null)
	const t = useTranslations('home.page')

	return (
		<Section className="py-lg!">
			<motion.header
				ref={containerRef}
				className={cx('group/hero relative overflow-hidden bg-transparent')}
			>
				<div className={cx('gap-casual relative flex flex-col px-0')}>
					<h1 className="typography-heading-xl max-w-xl font-bold">
						Hi, I&apos;m{' '}
						<span className="from-accent bg-linear-to-br to-[hsl(24,93%,58%)] bg-clip-text text-transparent">
							Nerdfish
						</span>
					</h1>

					<div className="mt-casual relative">
						<HeroCTA href="/contact">{t('hero.cta')}</HeroCTA>
					</div>
				</div>
			</motion.header>
		</Section>
	)
}
