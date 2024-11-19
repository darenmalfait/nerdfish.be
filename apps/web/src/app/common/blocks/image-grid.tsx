'use client'

import { Grid, GridCard, Skeleton } from '@nerdfish/ui'
import { cx } from '@nerdfish/utils'
import { Section } from '@nerdfish-website/ui/components'
import { useInView } from 'motion/react'
import Image from 'next/image'
import * as React from 'react'
import { tinaField } from 'tinacms/dist/react'
import {
	SectionHeader,
	SectionHeaderSubtitle,
	SectionHeaderTitle,
} from '../components'
import {
	type Block,
	type PageBlocksImageGrid,
	type PageBlocksImageGridItems,
} from '~/app/cms'

function ImageGridContent(props: PageBlocksImageGridItems) {
	const { title, image } = props

	if (!image) return null
	return (
		<div>
			<div className="absolute inset-0">
				<Skeleton className="h-full w-full" />
				<Image
					alt={title ?? ''}
					src={image}
					className="object-cover"
					layout="fill"
					objectFit="cover"
				/>
			</div>
		</div>
	)
}

function getGridItemClassName(index: number) {
	// Every second and third item should be half width
	if ((index + 1) % 3 === 2 || (index + 1) % 3 === 0) {
		return 'col-span-2'
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
				className="auto-rows-[40rem] !grid-cols-4"
				ref={ref}
			>
				{items?.map((item, i) => {
					if (!item?.image) return null

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
