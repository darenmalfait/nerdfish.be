import { Skeleton } from '@nerdfish/react/skeleton'
import { Grid, GridCard } from '@repo/design-system/components/grid'
import { cn } from '@repo/lib/utils/class'
import Image from 'next/image'
import { type ComponentProps } from 'react'
import { type ImageType } from '~/features/shared'

export interface ImageGridContentProps {
	image: ImageType
}

function ImageGridContent({ image }: ImageGridContentProps) {
	if (!image.src) return null
	return (
		<>
			<Skeleton className="absolute inset-0 size-full object-cover" />

			<Image
				alt={image.alt}
				src={image.src}
				className="absolute inset-0 size-full object-cover"
				width={550}
				height={550}
				objectFit="cover"
			/>
		</>
	)
}

function getGridItemClassName(index: number) {
	// Every second and third item should be half width
	if ((index + 1) % 3 === 2 || (index + 1) % 3 === 0) {
		return 'col-span-4 md:col-span-2'
	}

	return 'col-span-4'
}

export interface ImageGridProps extends ComponentProps<typeof Grid> {
	items: ImageGridContentProps[]
}

export function ImageGrid({ items, className, ref, ...props }: ImageGridProps) {
	return (
		<Grid
			className={cn(
				'auto-rows-[40rem] grid-cols-2! md:grid-cols-4!',
				className,
			)}
			ref={ref}
			{...props}
		>
			{items.map((item, i) => {
				if (!item.image.src) return null

				return (
					<GridCard
						style={{ animationDelay: `${i * 0.2}s` }}
						key={`${item.image.alt} ${i}`}
						className={cn(getGridItemClassName(i), 'animate-slide-left-in')}
					>
						<ImageGridContent {...item} />
					</GridCard>
				)
			})}
		</Grid>
	)
}
