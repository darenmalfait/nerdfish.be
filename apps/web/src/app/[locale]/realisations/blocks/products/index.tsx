import { Grid, GridCard, Skeleton } from '@repo/design-system/components/ui'
import * as React from 'react'
import { product } from '../../api'
import {
	ProductsOverviewContent,
	type ProductsOverviewContentProps,
} from './products'

export type ProductsOverviewProps = Omit<
	ProductsOverviewContentProps,
	'products'
>

export async function ProductsOverviewData(props: ProductsOverviewProps) {
	const items = await product.getAll()

	return <ProductsOverviewContent {...props} products={items} />
}

export async function ProductOverview(props: ProductsOverviewProps) {
	return (
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
			<ProductsOverviewData {...props} />
		</React.Suspense>
	)
}
