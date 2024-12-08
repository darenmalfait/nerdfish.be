'use client'

import { Grid, GridCard, Skeleton } from '@nerdfish/ui'
import { cx } from '@nerdfish/utils'
import {
	Section,
	SectionHeader,
	SectionHeaderSubtitle,
	SectionHeaderTitle,
} from '@repo/ui/components/section'
import { useInView } from 'motion/react'
import Image from 'next/image'
import * as React from 'react'
import { tinaField } from 'tinacms/dist/react'
import {
	type Block,
	type PageBlocksImageGrid,
	type PageBlocksImageGridItems,
} from '~/app/cms/types'

function ImageGridContent(props: PageBlocksImageGridItems) {
	const { title, imageSrc } = props

	if (!imageSrc) return null
	return (
		<div>
			<div className="absolute inset-0">
				<Skeleton className="h-full w-full" />
				<Image
					alt={title ?? ''}
					src={imageSrc}
					className="object-cover"
					width={550}
					height={550}
					objectFit="cover"
				/>
			</div>
		</div>
	)
}

function getGridItemClassName(index: number) {
	// Every second and third item should be half width
	if ((index + 1) % 3 === 2 || (index + 1) % 3 === 0) {
		return 'col-span-4 md:col-span-2'
	}

	return 'col-span-4'
}

export function ImageGridBlock(props: Block<PageBlocksImageGrid>) {
	const { title, subtitle, items } = props
	const ref = React.useRef<HTMLDivElement>(null)

	const isInView = useInView(ref, {
		once: true,
	})

	return (
		<Section>
			{title || subtitle ? (
				<SectionHeader>
					<SectionHeaderTitle>{title}</SectionHeaderTitle>
					<SectionHeaderSubtitle>{subtitle}</SectionHeaderSubtitle>
				</SectionHeader>
			) : null}
			<Grid
				data-tina-field={tinaField(props, 'items')}
				className="auto-rows-[40rem] !grid-cols-2 md:!grid-cols-4"
				ref={ref}
			>
				{items?.map((item, i) => {
					if (!item?.imageSrc) return null

					return (
						<GridCard
							style={{ animationDelay: `${i * 0.2}s` }}
							key={`${item.title} ${i}`}
							className={cx(
								getGridItemClassName(i),
								isInView && 'motion-preset-slide-left',
							)}
						>
							<ImageGridContent {...item} />
						</GridCard>
					)
				})}
			</Grid>
		</Section>
	)
}
