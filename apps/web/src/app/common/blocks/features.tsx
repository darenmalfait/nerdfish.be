'use client'

import { Grid, H3 } from '@nerdfish/ui'
import { Section } from '@nerdfish-website/ui/components'
import { camelCase, startCase } from 'lodash'
import * as Icons from 'lucide-react'
import * as React from 'react'
import { tinaField } from 'tinacms/dist/react'
import {
	ArrowLink,
	SectionHeader,
	SectionHeaderSubtitle,
	SectionHeaderTitle,
} from '../components'
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
		<ArrowLink
			className="text-accent mt-4 text-sm"
			href={`/${page._sys.filename}`}
		>
			Read more
		</ArrowLink>
	)
}

function FeatureCard(props: PageBlocksFeaturesItems) {
	const { title, description, icon, detail, ...rest } = props

	const Icon =
		icon && (dynamicHeroIcon(icon as keyof typeof Icons) as Icons.LucideIcon)

	return (
		<div className="relative flex size-full flex-col items-start" {...rest}>
			{Icon ? (
				<div
					className="bg-accent rounded-semi aspect-1 mb-6 flex items-center justify-center p-2 text-white lg:mt-0.5"
					aria-hidden
				>
					<Icon
						data-tina-field={tinaField(props, 'icon')}
						className="flex h-5 shrink-0"
					/>
				</div>
			) : null}
			<div className="flex h-full flex-col justify-between">
				<div>
					<H3
						data-tina-field={tinaField(props, 'title')}
						className="text-primary mb-4 flex flex-none items-end"
					>
						{title}
					</H3>
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
		<Section>
			<SectionHeader>
				<SectionHeaderTitle animatedText={title ?? undefined} />
				<SectionHeaderSubtitle>{subtitle}</SectionHeaderSubtitle>
			</SectionHeader>
			<Grid
				className="auto-rows-auto grid-cols-3 gap-x-8 gap-y-12"
				data-tina-field={tinaField(props, 'items')}
				asChild
			>
				<ul>
					{items?.map((item, i) => {
						if (!item) return null

						const { icon, ...itemProps } = item

						return (
							<li
								key={`${item.title} ${i}`}
								className="col-span-3 bg-none lg:col-span-1"
							>
								<FeatureCard
									{...itemProps}
									icon={
										icon
											? (`${startCase(camelCase(icon)).replace(/ /g, '')}` as keyof typeof Icons)
											: null
									}
								/>
							</li>
						)
					})}
				</ul>
			</Grid>
		</Section>
	)
}
