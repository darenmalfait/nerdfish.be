'use client'

import {
	Carousel,
	CarouselContent,
	CarouselItem,
} from '@repo/design-system/components/carousel'
import { MagnetButton } from '@repo/design-system/components/magnet'
import { Section } from '@repo/design-system/components/section'
import { ArrowRightIcon } from '@repo/design-system/icons'
import { useTranslations } from '@repo/i18n/client'
import { cx } from 'class-variance-authority'
import { motion } from 'motion/react'
import Image from 'next/image'
import { type ComponentProps, useRef } from 'react'
import image4 from '../../../../public/images/products/nerdfish-4.png'
import image1 from '../../../../public/images/products/nerdfishui-4.png'
import image3 from '../../../../public/uploads/projects/de-borgerij/deborgerij-gallery.png'
import image6 from '../../../../public/uploads/projects/equilibra/equilibra-content.png'
import image2 from '../../../../public/uploads/projects/equilibra/equilibra-home.png'
import image5 from '../../../../public/uploads/projects/kapsalon-lieve/kapsalon-lieve-home.png'
import { Link } from '~/app/components/link'

const images = [
	{
		image: image1,
		alt: 'Nerdfish UI Component Library Design',
	},

	{
		image: image2,
		alt: 'Equilibra Website Design',
	},
	{
		image: image3,
		alt: 'De Borgerij Website Design',
	},

	{
		image: image4,
		alt: 'Nerdfish Website Design',
	},
	{
		image: image5,
		alt: 'Kapsalon Lieve Website Design',
	},
	{
		image: image6,
		alt: 'Equilibra Content Page Design',
	},
]

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
		<Section className="py-lg! max-w-none px-0">
			<Carousel opts={{ loop: true, align: 'center' }}>
				<CarouselContent className="p-bff">
					{images.map((image, index) => (
						<CarouselItem index={index} key={index}>
							<div className="border-border/20 rounded-base relative aspect-3/4 w-full overflow-hidden border shadow-md">
								<Image
									src={image.image.src}
									alt={image.alt}
									className="absolute inset-0 size-full object-cover"
									placeholder={image.image.blurDataURL ? 'blur' : undefined}
									blurDataURL={image.image.blurDataURL}
									loading="eager"
									width={500}
									height={500}
								/>
							</div>
						</CarouselItem>
					))}
				</CarouselContent>
				<div className="py-friends px-casual sm:py-casual sm:px-acquaintances rounded-container border-border bg-background-secondary inset-x-friends w-[calc(100vw-theme(spacing.friends) * 2)] -bottom-casual absolute mx-auto max-w-md border text-center shadow-md backdrop-blur-md backdrop-saturate-150 md:max-w-lg lg:max-w-xl">
					<motion.header
						ref={containerRef}
						className={cx('group/hero relative bg-transparent')}
					>
						<div className={cx('gap-casual relative flex flex-col px-0')}>
							<h1 className="typography-heading-lg max-w-xl font-bold">
								<span className="block">Hi, I&apos;m</span>
								<span className="from-accent block bg-linear-to-br to-[hsl(24,93%,58%)] bg-clip-text text-transparent">
									Nerdfish
								</span>
							</h1>

							<div className="mt-casual relative">
								<HeroCTA href="/contact">{t('hero.cta')}</HeroCTA>
							</div>
						</div>
					</motion.header>
				</div>
			</Carousel>
		</Section>
	)
}
