'use client'

import { Grid, H3 } from '@nerdfish/ui'
import { cx } from '@nerdfish/utils'
import {
	MagnetButton,
	Section,
	SectionHeader,
	SectionHeaderSubtitle,
	SectionHeaderTitle,
} from '@nerdfish-website/ui/components'
import { ArrowRight } from '@nerdfish-website/ui/icons'
import { camelCase, startCase } from 'lodash'
import * as Icons from 'lucide-react'
import { useInView } from 'motion/react'
import Link from 'next/link'
import * as React from 'react'
import { tinaField } from 'tinacms/dist/react'
import {
	type Block,
	type Page,
	type PageBlocksFeatures,
	type PageBlocksFeaturesItems,
} from '~/app/cms'
import { useTranslation } from '~/app/i18n'

const dynamicHeroIcon = (name: keyof typeof Icons) => Icons[name]

function DetailLink({ page, title }: { page?: Page; title?: string }) {
	const { t } = useTranslation()
	if (!page) return null

	return (
		<div className="mt-md">
			<MagnetButton className="-mx-md group" variant="ghost" asChild>
				<Link
					href={`/${page._sys.breadcrumbs.join('/')}`}
					aria-label={`${t('features.readMore')} ${t('global.about')} ${title}`}
				>
					{t('features.readMore')}
					<ArrowRight className="ml-sm group-hover:translate-x-xs size-4 transition-transform" />
				</Link>
			</MagnetButton>
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
					className="aspect-1 mb-lg text-primary flex items-center justify-center"
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
				<DetailLink page={detail as Page} title={title ?? ''} />
			</div>
		</div>
	)
}

export function FeaturesBlock(props: Block<PageBlocksFeatures>) {
	const ref = React.useRef<HTMLDivElement>(null)
	const inView = useInView(ref, {
		once: true,
	})
	const { title, subtitle, items } = props

	return (
		<Section>
			<SectionHeader>
				<SectionHeaderTitle>{title}</SectionHeaderTitle>
				<SectionHeaderSubtitle>{subtitle}</SectionHeaderSubtitle>
			</SectionHeader>
			<Grid
				ref={ref}
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
								style={{ animationDelay: `${i * 0.2}s` }}
								className={cx('col-span-4 bg-none opacity-0 lg:col-span-1', {
									'motion-preset-slide-left opacity-100': inView,
								})}
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
