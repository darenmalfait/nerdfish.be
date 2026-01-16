'use client'

import { type Article } from '@repo/design-system/components/article-overview'
import {
	HighlightCard,
	HighlightCardCTA,
	HighlightCardCategory,
	HighlightCardContent,
	HighlightCardDescription,
	HighlightCardImage,
	HighlightCardTitle,
} from '@repo/design-system/components/highlight-card'
import { useTranslations } from '@repo/i18n/client'
import { cn } from '@repo/lib/utils/class'
import { type MotionValue, motion, useScroll, useTransform } from 'motion/react'
import { useRef, type ComponentProps } from 'react'
import { Link } from './link'

interface CardWrapperProps extends ComponentProps<typeof motion.div> {
	progress: MotionValue<number>
	range: [number, number]
	targetScale: number
	index: number
}

function CardWrapper({
	progress,
	range,
	targetScale,
	children,
	index,
	style,
	...props
}: CardWrapperProps) {
	const scale = useTransform(progress, range, [1, targetScale])

	return (
		<div className={cn('top-distant sticky flex justify-center')}>
			<motion.div
				style={{ ...style, scale, top: `${index * 25}px` }}
				className={cn(
					'relative top-0 flex origin-top items-center justify-center',
				)}
				{...props}
			>
				{children}
			</motion.div>
		</div>
	)
}

export interface HighlightsProps extends ComponentProps<'div'> {
	items: Article[]
}

export function Highlights(props: HighlightsProps) {
	const { items } = props
	const t = useTranslations('global')
	const containerRef = useRef<HTMLDivElement>(null)

	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ['start start', 'end end'],
	})

	return (
		<div ref={containerRef}>
			<div className="gap-distant flex flex-col">
				{items.map((item, i) => {
					const { title, category, description, image, href } = item
					const targetScale = 1 - (items.length - i) * 0.05

					return (
						<CardWrapper
							key={title}
							style={{
								top: `${i * 30}px`,
							}}
							progress={scrollYProgress}
							range={[i * 0.25, 1]}
							targetScale={targetScale}
							index={i}
						>
							<HighlightCard title={title}>
								<HighlightCardContent>
									<HighlightCardCategory value={category} />
									<HighlightCardTitle>{title}</HighlightCardTitle>
									<HighlightCardDescription>
										{description}
									</HighlightCardDescription>
									{href ? (
										<HighlightCardCTA
											as={Link}
											category={category}
											href={href}
											aria-label={t('readMoreAbout', { topic: title })}
										>
											{t('discover', { topic: title })}
										</HighlightCardCTA>
									) : null}
								</HighlightCardContent>
								<HighlightCardImage src={image?.src} alt={image?.alt} />
							</HighlightCard>
						</CardWrapper>
					)
				})}
			</div>
		</div>
	)
}
