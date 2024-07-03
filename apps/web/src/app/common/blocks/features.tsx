'use client'

import { Grid, H2 } from '@nerdfish/ui'
import { camelCase, startCase } from 'lodash'
import * as Icons from 'lucide-react'
import { tinaField } from 'tinacms/dist/react'

import { ArrowLink, Header } from '../components'
import {
	type Block,
	type Page,
	type PageBlocksFeatures,
	type PageBlocksFeaturesItems,
} from '~/app/cms'

const dynamicHeroIcon = (name: keyof typeof Icons) => Icons[name]

function DetailLink({ page }: { page?: Page }) {
	if (!page) return null

	return (
		<ArrowLink className="mt-4 text-sm" href={`/${page._sys.filename}`}>
			Read more
		</ArrowLink>
	)
}

function FeatureCard(props: PageBlocksFeaturesItems) {
	const { title, description, icon, detail, ...rest } = props

	const Icon =
		icon && (dynamicHeroIcon(icon as keyof typeof Icons) as Icons.LucideIcon)

	return (
		<div
			className="shadow-outline relative flex size-full flex-col items-start gap-3 p-6 px-8 lg:flex-row lg:gap-6 lg:px-12 lg:py-10"
			{...rest}
		>
			{Icon ? (
				<Icon
					data-tina-field={tinaField(props, 'icon')}
					className="text-primary flex h-8 shrink-0 lg:mt-0.5"
				/>
			) : null}
			<div className="flex h-full flex-col justify-between">
				<div>
					<H2
						data-tina-field={tinaField(props, 'title')}
						as="h3"
						className="text-primary mb-4 flex flex-none items-end !text-xl font-medium tracking-normal"
					>
						{title}
					</H2>
					<p
						data-tina-field={tinaField(props, 'description')}
						className="text-muted flex-auto text-lg"
					>
						{description}
					</p>
				</div>
				<DetailLink page={detail as Page} />
			</div>
		</div>
	)
}

export function FeaturesBlock(props: Block<PageBlocksFeatures>) {
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
			<Grid
				className="auto-rows-auto grid-cols-4"
				data-tina-field={tinaField(props, 'items')}
			>
				{items?.map((item, i) => {
					if (!item) return null

					const { icon, ...itemProps } = item

					return (
						<Grid.Card
							key={`${item.title} ${i}`}
							className="bg-muted col-span-4 lg:col-span-2"
						>
							<FeatureCard
								{...itemProps}
								icon={
									icon
										? (`${startCase(camelCase(icon)).replace(/ /g, '')}` as keyof typeof Icons)
										: null
								}
							/>
						</Grid.Card>
					)
				})}
			</Grid>
		</section>
	)
}
