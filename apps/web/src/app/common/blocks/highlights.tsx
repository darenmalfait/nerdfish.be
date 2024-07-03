'use client'

import { Grid, H3, Paragraph } from '@nerdfish/ui'
import { cx } from '@nerdfish/utils'
import Image from 'next/image'
import { tinaField } from 'tinacms/dist/react'

import { Header } from '../components'
import {
	type Block,
	type PageBlocksHighlights,
	type PageBlocksHighlightsItems,
} from '~/app/cms'

function HighlightCardContent(props: PageBlocksHighlightsItems) {
	const { title, description, image } = props
	return (
		<>
			<div />
			{image ? (
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
			) : null}
			<div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 p-6 transition-all duration-300 group-hover:-translate-y-10">
				<H3 className="text-primary text-xl font-semibold">{title}</H3>
				<Paragraph className="text-muted max-w-lg">{description}</Paragraph>
			</div>

			{
				<div className="group-hover:bg-popover pointer-events-none absolute inset-0 transform-gpu transition-all duration-300" />
			}
		</>
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

export function HighlightsBlock(props: Block<PageBlocksHighlights>) {
	const { title, subtitle, items } = props

	return (
		<section className="container mx-auto my-24 px-4">
			{title ?? subtitle ? (
				<Header
					title={title?.toString()}
					subtitle={subtitle}
					className="mb-12"
				/>
			) : null}
			<Grid data-tina-field={tinaField(props, 'items')}>
				{items?.map((item, i) => {
					if (!item) return null

					return (
						<Grid.Card
							key={`${item.title} ${i}`}
							className={cx(getGridItemClassName(i), !item.image && 'bg-muted')}
						>
							<HighlightCardContent {...item} />
						</Grid.Card>
					)
				})}
			</Grid>
		</section>
	)
}
