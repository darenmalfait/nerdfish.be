'use client'

import { Button, Grid, H3 } from '@nerdfish/ui'
import { Section } from '@nerdfish-website/ui/components'
import { ArrowUpRight } from '@nerdfish-website/ui/icons'
import { camelCase, startCase } from 'lodash'
import * as Icons from 'lucide-react'
import Link from 'next/link'
import * as React from 'react'
import { tinaField } from 'tinacms/dist/react'
import {
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
import { useTranslation } from '~/app/i18n'

const dynamicHeroIcon = (name: keyof typeof Icons) => Icons[name]

function DetailLink({ page }: { page?: Page }) {
	const { t } = useTranslation()
	if (!page) return null

	return (
		<div className="mt-md">
			<Button className="group" asChild>
				<Link href={`/${page._sys.breadcrumbs.join('/')}`}>
					{t('features.readMore')}
					<ArrowUpRight className="ml-sm size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
				</Link>
			</Button>
		</div>
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
					className="bg-accent rounded-semi aspect-1 mb-lg p-sm flex items-center justify-center text-white"
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
						className="text-primary mb-md flex flex-none items-end"
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
				className="gap-xl auto-rows-auto grid-cols-4"
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
