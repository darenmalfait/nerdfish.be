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
import { cx } from '@repo/lib/utils/base'
import { type MotionValue, motion, useScroll, useTransform } from 'motion/react'
import * as React from 'react'
import { Link } from './link'

interface CardWrapperProps extends React.ComponentProps<typeof motion.div> {
	progress: MotionValue<number>
	range: [number, number]
	targetScale: number
}

function CardWrapper({
	progress,
	range,
	targetScale,
	children,
	style,
	...props
}: CardWrapperProps) {
	const scale = useTransform(progress, range, [1, targetScale])

	return (
		<div className="top-md md:top-3xl sticky flex justify-center">
			<motion.div
				style={{ ...style, scale }}
				className={cx(
					'relative top-0 flex origin-top items-center justify-center',
				)}
				{...props}
			>
				{children}
			</motion.div>
		</div>
	)
}

export interface HighlightsProps extends React.ComponentProps<'div'> {
	items: Article[]
}

export function Highlights(props: HighlightsProps) {
	const { items } = props
	const t = useTranslations('global')
	const containerRef = React.useRef<HTMLDivElement>(null)

	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ['start start', 'end end'],
	})

	return (
		<div ref={containerRef}>
			<div className="gap-3xl flex flex-col">
				{items.map((item, i) => {
					const targetScale = 1 - (items.length - 1 - i) * 0.2
					const { title, category, description, image, href } = item

					return (
						<CardWrapper
							key={title}
							style={{
								top: `${i * 30}px`,
							}}
							progress={scrollYProgress}
							range={[i * 0.25, 1]}
							targetScale={targetScale}
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
