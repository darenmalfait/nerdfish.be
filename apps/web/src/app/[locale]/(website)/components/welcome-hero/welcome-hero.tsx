'use client'

import {
	Carousel,
	CarouselContent,
	CarouselItem as BaseCarouselItem,
} from '@repo/design-system/components/carousel'
import { CategoryIndicator } from '@repo/design-system/components/category-indicator'
import { MagnetButton } from '@repo/design-system/components/magnet'
import { Section } from '@repo/design-system/components/section'
import { ArrowRightIcon } from '@repo/design-system/icons'
import { useTranslations } from '@repo/i18n/client'
import { cn } from '@repo/lib/utils/class'
import { type Project } from 'content-collections'
import { motion } from 'motion/react'
import Image from 'next/image'
import { type ComponentProps, useRef } from 'react'
import image4 from '../../../../../../public/images/products/nerdfish-4.png'
import image1 from '../../../../../../public/images/products/nerdfishui-4.png'
import image3 from '../../../../../../public/uploads/projects/de-borgerij/deborgerij-gallery.png'
import image6 from '../../../../../../public/uploads/projects/equilibra/equilibra-content.png'
import image2 from '../../../../../../public/uploads/projects/equilibra/equilibra-home.png'
import image5 from '../../../../../../public/uploads/projects/kapsalon-lieve/kapsalon-lieve-home.png'
import { Link } from '~/app/[locale]/common/components/link'

function CarouselItem({
	children,
	index,
	category,
	...props
}: ComponentProps<'div'> & { index?: number; category?: Project['category'] }) {
	return (
		<BaseCarouselItem index={index} {...props}>
			<div className="border-border/20 rounded-container relative aspect-3/4 w-full overflow-hidden border shadow-md">
				{category ? (
					<CategoryIndicator className="mb-friends" category={category} />
				) : null}
				{children}
			</div>
		</BaseCarouselItem>
	)
}

function CarouselImage({
	src,
	alt,
	className,
	...props
}: ComponentProps<typeof Image>) {
	return (
		<Image
			src={src}
			alt={alt}
			className={cn('absolute inset-0 size-full object-cover', className)}
			placeholder={props.blurDataURL ? 'blur' : undefined}
			loading="eager"
			width={500}
			height={500}
			{...props}
		/>
	)
}

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

// function CarouselCard({
// 	children,
// 	className,
// 	...props
// }: ComponentProps<'div'>) {
// 	return (
// 		<div
// 			className={cn(
// 				'p-friends gap-best-friends inline-flex size-full flex-col items-start justify-center',
// 				className,
// 			)}
// 			{...props}
// 		>
// 			{children}
// 		</div>
// 	)
// }

export function WelcomeHero() {
	const containerRef = useRef<HTMLDivElement>(null)
	const t = useTranslations('home.page')

	return (
		<Section className="py-lg! max-w-none px-0">
			<Carousel opts={{ loop: true, align: 'center' }}>
				<CarouselContent className="p-bff">
					<CarouselItem category="product">
						<CarouselImage
							src={image1.src}
							alt="Nerdfish UI Component Library Design"
							blurDataURL={image1.blurDataURL}
						/>
					</CarouselItem>
					<CarouselItem category="webdesign">
						<CarouselImage
							src={image2.src}
							alt="Equilibra Website Design"
							blurDataURL={image2.blurDataURL}
						/>
					</CarouselItem>
					<CarouselItem category="webdesign">
						<CarouselImage
							src={image3.src}
							alt="De Borgerij Website Design"
							blurDataURL={image3.blurDataURL}
						/>
					</CarouselItem>
					<CarouselItem category="webdesign">
						<CarouselImage
							src={image4.src}
							alt="Nerdfish Website Design"
							blurDataURL={image4.blurDataURL}
						/>
					</CarouselItem>
					<CarouselItem category="webdesign">
						<CarouselImage
							src={image5.src}
							alt="Kapsalon Lieve Website Design"
							blurDataURL={image5.blurDataURL}
						/>
					</CarouselItem>
					<CarouselItem category="webdesign">
						<CarouselImage
							src={image6.src}
							alt="Equilibra Content Page Design"
							blurDataURL={image6.blurDataURL}
						/>
					</CarouselItem>
				</CarouselContent>
				<div className="py-casual px-casual sm:py-casual sm:px-acquaintances rounded-container border-border bg-background-secondary inset-x-friends w-[calc(100vw-theme(spacing.friends) * 2)] -bottom-distant absolute mx-auto max-w-md border text-center shadow-md backdrop-blur-md backdrop-saturate-150 md:max-w-lg lg:max-w-xl">
					<motion.header
						ref={containerRef}
						className={cn('group/hero relative bg-transparent')}
					>
						<div className={cn('gap-casual relative flex flex-col px-0')}>
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
