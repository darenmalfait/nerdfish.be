import { Skeleton } from '@nerdfish/ui'
import { cx } from '@nerdfish/utils'
import { Section } from '@nerdfish-website/ui/components'
import Image from 'next/image'
import * as React from 'react'
import { tinaField } from 'tinacms/dist/react'
import {
	type PageBlocksSplitWithImage,
	PortableText,
	type Block,
} from '~/app/cms'

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
					'gap-lg flex flex-col md:flex-row',
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
			<div className="prose prose-xl lg:prose-2xl dark:prose-invert pt-xl w-full">
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
						'aspect-1 rounded-large relative w-full overflow-hidden',
					)}
				>
					<Skeleton className="rounded-large absolute inset-0 size-full object-cover" />

					<Image
						className="rounded-large motion-blur-in-3xl motion-duration-500 absolute inset-0 size-full object-cover"
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
