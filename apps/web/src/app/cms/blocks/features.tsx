'use client'

import { Grid, H3 } from '@nerdfish/ui'
import { type VariantProps, cva, cx } from '@nerdfish/utils'
import { MagnetButton } from '@repo/ui/components/magnet-button'
import {
	Section,
	SectionHeader,
	SectionHeaderSubtitle,
	SectionHeaderTitle,
} from '@repo/ui/components/section'
import { ArrowRight } from '@repo/ui/icons'
import { camelCase, startCase } from 'lodash'
import * as Icons from 'lucide-react'
import { useInView } from 'motion/react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import * as React from 'react'
import { tinaField } from 'tinacms/dist/react'
import type {
	Block,
	Page,
	PageBlocksFeatures,
	PageBlocksFeaturesItems,
} from '~/app/cms/types'

const dynamicHeroIcon = (name: keyof typeof Icons) => Icons[name]

function DetailLink({ page, title }: { page?: Page; title?: string }) {
	const t = useTranslations()
	if (!page) return null

	return (
		<div className="mt-md">
			<MagnetButton className="-mx-sm group" variant="ghost" asChild>
				<Link
					href={`/${page._sys.breadcrumbs.join('/')}`}
					aria-label={`${t('features.readMore')} ${t('global.about')} ${title}`}
				>
					{t('features.readMore')}
					<ArrowRight className="ml-sm size-4 transition-transform group-hover:translate-x-xs" />
				</Link>
			</MagnetButton>
		</div>
	)
}

const featureCardVariants = cva(
	'relative flex size-full flex-col items-start',
	{
		variants: {
			variant: {
				default: '',
				secondary: 'rounded-container bg-muted p-lg',
			},
		},
		defaultVariants: {
			variant: 'secondary',
		},
	}
)

function FeatureCard(
	props: PageBlocksFeaturesItems & VariantProps<typeof featureCardVariants>
) {
	const { title, description, icon, detail, variant, ...rest } = props

	const Icon =
		icon && (dynamicHeroIcon(icon as keyof typeof Icons) as Icons.LucideIcon)

	return (
		<div className={featureCardVariants({ variant })} {...rest}>
			{Icon ? (
				<div
					className="mb-lg flex aspect-1 items-center justify-center text-primary"
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
						className="mb-md flex flex-none items-end text-primary"
					>
						{title}
					</H3>
					<p
						data-tina-field={tinaField(props, 'description')}
						className="flex-auto text-lg text-muted"
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
	const { title, subtitle, items, layout } = props

	const ref = React.useRef<HTMLDivElement>(null)
	const inView = useInView(ref, {
		once: true,
	})

	const maxCols = layout?.maxCols ?? '4'
	const variant = layout?.variant ?? 'default'

	return (
		<Section>
			<SectionHeader>
				<SectionHeaderTitle>{title}</SectionHeaderTitle>
				<SectionHeaderSubtitle>{subtitle}</SectionHeaderSubtitle>
			</SectionHeader>
			<Grid
				ref={ref}
				className={cx('auto-rows-auto gap-lg', {
					'grid-cols-2': maxCols === '2',
					'grid-cols-3': maxCols === '3',
					'grid-cols-4': maxCols === '4',
				})}
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
								className={cx('bg-none opacity-0', {
									'motion-preset-slide-left opacity-100 lg:col-span-1': inView,
									'col-span-4': maxCols === '4',
									'col-span-3': maxCols === '3',
									'col-span-2': maxCols === '2',
								})}
							>
								<FeatureCard
									{...itemProps}
									variant={
										variant as VariantProps<
											typeof featureCardVariants
										>['variant']
									}
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
