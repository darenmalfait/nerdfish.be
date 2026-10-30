import { Suspense } from 'react'
import { Skeleton } from '@nerdfish/react/skeleton'

import { getLocale } from '@repo/i18n/server'

import { getProducts } from '../../api/get-products'
import { getProductPath } from '../../utils/get-product-path'

import {
	ProductCard,
	ProductCardContent,
	ProductCardDescription,
	ProductCardImage,
	ProductCardTitle,
} from './product-card'

export async function ProductOverviewData() {
	const locale = await getLocale()
	const items = await getProducts({ locale })

	return (
		<ul role="list" className="gap-friends flex flex-col">
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
					<Skeleton className="w-screen max-w-50" />
				</ProductCardTitle>
				<ProductCardDescription>
					<Skeleton className="w-screen max-w-100" />
				</ProductCardDescription>
			</ProductCardContent>
		</ProductCard>
	)
}

function LoadingSkeleton() {
	return (
		<ul role="list" className="gap-friends flex flex-col">
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
