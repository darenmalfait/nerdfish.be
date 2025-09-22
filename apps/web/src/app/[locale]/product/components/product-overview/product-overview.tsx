import { Skeleton } from '@repo/design-system/components/ui'
import { getLocale } from '@repo/i18n/server'
import { Suspense } from 'react'
import { product } from '../../api'
import { getProductPath } from '../../utils'
import {
	ProductCard,
	ProductCardContent,
	ProductCardDescription,
	ProductCardImage,
	ProductCardTitle,
} from './product-card'

export async function ProductOverviewData() {
	const locale = await getLocale()
	const items = await product.getAll({ locale })

	return (
		<ul role="list" className="gap-md flex flex-col">
			{items.map((item) => (
				<ProductCard key={item.id} href={getProductPath(item)}>
					<ProductCardImage icon={item.icon} />
					<ProductCardContent>
						<ProductCardTitle>{item.title}</ProductCardTitle>
						<ProductCardDescription>{item.description}</ProductCardDescription>
					</ProductCardContent>
				</ProductCard>
			))}
		</ul>
	)
}

function CardSkeleton() {
	return (
		<ProductCard>
			<Skeleton className="size-12" />
			<ProductCardContent>
				<ProductCardTitle>
					<Skeleton className="w-screen max-w-[200px]" />
				</ProductCardTitle>
				<ProductCardDescription>
					<Skeleton className="w-screen max-w-[400px]" />
				</ProductCardDescription>
			</ProductCardContent>
		</ProductCard>
	)
}

function LoadingSkeleton() {
	return (
		<ul role="list" className="gap-md flex flex-col">
			<CardSkeleton />
			<CardSkeleton />
			<CardSkeleton />
		</ul>
	)
}

export async function ProductOverview() {
	return (
		<Suspense fallback={<LoadingSkeleton />}>
			<ProductOverviewData />
		</Suspense>
	)
}
