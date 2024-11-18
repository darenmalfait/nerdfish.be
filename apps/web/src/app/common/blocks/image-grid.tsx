'use client'

import { Grid, GridCard } from '@nerdfish/ui'
import { cx } from '@nerdfish/utils'
import { Section } from '@nerdfish-website/ui/components'
import Image from 'next/image'
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
	const rowIndex = Math.floor(index / 2)
	const isEven = index % 2 === 0

	let className = isEven ? 'lg:col-span-2' : 'lg:col-span-1'

	if (rowIndex % 2 === 0) {
		className = isEven ? 'lg:col-span-1' : 'lg:col-span-2'
	}

	return className
}

export function ImageGridBlock(props: Block<PageBlocksImageGrid>) {
	const { title, subtitle, items } = props

	return (
		<Section>
			<SectionHeader>
				<SectionHeaderTitle>{title}</SectionHeaderTitle>
				<SectionHeaderSubtitle>{subtitle}</SectionHeaderSubtitle>
			</SectionHeader>
			<Grid data-tina-field={tinaField(props, 'items')}>
				{items?.map((item, i) => {
					if (!item) return null

					return (
						<GridCard
							key={`${item.title} ${i}`}
							className={cx(getGridItemClassName(i), !item.image && 'bg-muted')}
						>
							<ImageGridContent {...item} />
						</GridCard>
					)
				})}
			</Grid>
		</Section>
	)
}
