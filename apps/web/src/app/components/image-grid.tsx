'use client'

import { Grid, GridCard, Skeleton } from '@repo/design-system/components/ui'
import { cx } from '@repo/lib/utils/base'
import { useInView } from 'motion/react'
import Image from 'next/image'
import { type ComponentProps, useImperativeHandle, useRef } from 'react'
import { type ImageType } from '../types'

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
	const containerRef = useRef<HTMLDivElement>(null)
	useImperativeHandle(ref, () => containerRef.current as HTMLDivElement)

	const isInView = useInView(containerRef, {
		once: true,
	})

	return (
		<Grid
			className={cx(
				'auto-rows-[40rem] !grid-cols-2 md:!grid-cols-4',
				className,
			)}
			ref={containerRef}
			{...props}
		>
			{items.map((item, i) => {
				if (!item.image.src) return null

				return (
					<GridCard
						style={{ animationDelay: `${i * 0.2}s` }}
						key={`${item.image.alt} ${i}`}
						className={cx(
							getGridItemClassName(i),
							isInView && 'motion-preset-slide-left',
						)}
					>
						<ImageGridContent {...item} />
					</GridCard>
				)
			})}
		</Grid>
	)
}
