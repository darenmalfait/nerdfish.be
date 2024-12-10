import { cx } from '@nerdfish/utils'
import { Section } from '@repo/design-system/components/section'
import { Skeleton } from '@repo/design-system/components/ui'
import Image from 'next/image'
import type * as React from 'react'
import { tinaField } from 'tinacms/dist/react'
import { PortableText } from '../components/portable-text'
import { type Block, type PageBlocksSplitWithImage } from '~/app/cms/types'

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
					'gap-lg flex flex-col md:flex-row md:items-center',
					reverse && 'md:flex-row-reverse',
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
						'aspect-1 rounded-container relative w-full overflow-hidden',
					)}
				>
					<Skeleton className="rounded-container absolute inset-0 size-full object-cover" />

					<Image
						className="motion-blur-in-3xl motion-duration-500 rounded-container absolute inset-0 size-full object-cover"
						data-tina-field={tinaField(data, 'image')}
						width={550}
						height={550}
						src={image.src}
						alt={image.alt ?? ''}
					/>
				</div>
			) : null}
		</BlockLayout>
	)
}
