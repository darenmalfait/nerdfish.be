import {
	Section,
	SectionHeader,
	SectionHeaderSubtitle,
	SectionHeaderTitle,
} from '@repo/design-system/components/section'
import { Grid, GridCard, Skeleton } from '@repo/design-system/components/ui'
import { type PartialDeep } from '@repo/design-system/lib/utils/types'
import { type Product } from 'content-collections'
import * as React from 'react'
import { product } from '../../api'
import { ProductsOverviewContent } from './products'
import { type PageBlocksWork } from '~/app/cms/types'

export async function ProductsOverviewContentBlockContent() {
	const items = await product.getAll()

	return <ProductsOverviewContent products={items} />
}

export async function ProductsOverviewBlock(
	data: PageBlocksWork & {
		relatedTo?: PartialDeep<Product>
	},
) {
	const { header } = data
	const { title, subtitle, link } = header ?? {}

	return (
		<Section>
			{(title ?? subtitle) ? (
				<div className="mb-6">
					<SectionHeader
						cta={{
							title: 'See all products',
							url: link ?? '',
						}}
					>
						<SectionHeaderTitle>{title}</SectionHeaderTitle>
						<SectionHeaderSubtitle>{subtitle}</SectionHeaderSubtitle>
					</SectionHeader>
				</div>
			) : null}
			<React.Suspense
				fallback={
					<Grid asChild className="auto-rows-[15rem]">
						<ul>
							{Array.from({ length: 6 }).map((_, i) => (
								<GridCard key={i} className="elative lg:col-span-1" asChild>
									<li>
										<Skeleton className="absolute inset-0 size-full" />
									</li>
								</GridCard>
							))}
						</ul>
					</Grid>
				}
			>
				<ProductsOverviewContentBlockContent />
			</React.Suspense>
		</Section>
	)
}
