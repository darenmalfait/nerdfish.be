import { Skeleton } from '@nerdfish/ui'
import { cx } from '@nerdfish/utils'
import { Section } from '@repo/ui/components/section'
import Image from 'next/image'
import type * as React from 'react'
import { tinaField } from 'tinacms/dist/react'
import type { Block, PageBlocksSplitWithImage } from '~/app/cms/types'
import { PortableText } from '../components/portable-text'

function BlockLayout({
	children,
	reverse,
}: {
	children: React.ReactNode
	reverse?: boolean
}) {
	if (!children) return null

	return (
		<Section>
			<div
				className={cx(
					'flex flex-col gap-lg md:flex-row md:items-center',
					reverse && 'md:flex-row-reverse'
				)}
			>
				{children}
			</div>
		</Section>
	)
}

export function SplitWithImageBlock(data: Block<PageBlocksSplitWithImage>) {
	const { body, image, reverse } = data

	return (
		<BlockLayout reverse={reverse ?? false}>
			<div className="prose prose-xl lg:prose-2xl dark:prose-invert w-full">
				{body ? (
					<PortableText
						data-tina-field={tinaField(data, 'body')}
						content={body}
					/>
				) : null}
			</div>
			{image?.src ? (
				<div
					className={cx(
						'relative aspect-1 w-full overflow-hidden rounded-container'
					)}
				>
					<Skeleton className="absolute inset-0 size-full rounded-container object-cover" />

					<Image
						className="motion-blur-in-3xl motion-duration-500 absolute inset-0 size-full rounded-container object-cover"
						data-tina-field={tinaField(data, 'image')}
						fill
						src={image.src}
						alt={image.alt ?? ''}
					/>
				</div>
			) : null}
		</BlockLayout>
	)
}
