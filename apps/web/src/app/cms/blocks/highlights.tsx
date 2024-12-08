'use client'

import { cx } from '@nerdfish/utils'
import {
	HighlightCard,
	HighlightCardCTA,
	HighlightCardCategory,
	HighlightCardContent,
	HighlightCardDescription,
	HighlightCardImage,
	HighlightCardTitle,
} from '@repo/ui/components/highlight-card'
import {
	Section,
	SectionHeader,
	SectionHeaderSubtitle,
	SectionHeaderTitle,
} from '@repo/ui/components/section'
import { type MotionValue, motion, useScroll, useTransform } from 'motion/react'
import * as React from 'react'
import { tinaField } from 'tinacms/dist/react'
import { getPagePath } from '~/app/[locale]/(pages)/utils'
import { type Block, type PageBlocksHighlights } from '~/app/cms/types'

const Card = React.forwardRef<
	React.ElementRef<typeof motion.div>,
	React.ComponentPropsWithoutRef<typeof motion.div> & {
		progress: MotionValue<number>
		range: [number, number]
		targetScale: number
	}
>(
	(
		{ children, style, progress, className, range, targetScale, ...props },
		ref,
	) => {
		const scale = useTransform(progress, range, [1, targetScale])

		return (
			<div className="top-md md:top-3xl sticky flex justify-center">
				<motion.div
					ref={ref}
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
	},
)
Card.displayName = 'Card'

export function HighlightsBlock(props: Block<PageBlocksHighlights>) {
	const { items, sectionHeader } = props
	const containerRef = React.useRef<HTMLDivElement>(null)

	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ['start start', 'end end'],
	})

	if (!items) return null

	return (
		<Section ref={containerRef}>
			{sectionHeader?.title ? (
				<SectionHeader>
					<SectionHeaderTitle
						data-tina-field={tinaField(sectionHeader, 'title')}
					>
						{sectionHeader.title}
					</SectionHeaderTitle>
					<SectionHeaderSubtitle
						data-tina-field={tinaField(sectionHeader, 'subtitle')}
					>
						{sectionHeader.subtitle}
					</SectionHeaderSubtitle>
				</SectionHeader>
			) : null}
			<div className="gap-3xl flex flex-col">
				{items.map((item, i) => {
					if (!item) return null
					const targetScale = 1 - (items.length - 1 - i) * 0.2
					const { title, category, excerpt, image, linkText, reference } = item

					return (
						<Card
							key={title}
							style={{
								top: `${i * 30}px`,
							}}
							progress={scrollYProgress}
							range={[i * 0.25, 1]}
							targetScale={targetScale}
						>
							<HighlightCard title={title ?? ''}>
								<HighlightCardContent>
									<HighlightCardCategory
										value={category}
										data-tina-field={tinaField(item, 'category')}
									/>
									<HighlightCardTitle
										data-tina-field={tinaField(item, 'title')}
									>
										{title}
									</HighlightCardTitle>
									<HighlightCardDescription
										data-tina-field={tinaField(item, 'excerpt')}
									>
										{excerpt}
									</HighlightCardDescription>
									{reference ? (
										<HighlightCardCTA
											category={category}
											href={getPagePath(reference)}
										>
											{linkText}
										</HighlightCardCTA>
									) : null}
								</HighlightCardContent>
								<HighlightCardImage
									src={image?.src}
									alt={image?.alt ?? title ?? ''}
								/>
							</HighlightCard>
						</Card>
					)
				})}
			</div>
		</Section>
	)
}
