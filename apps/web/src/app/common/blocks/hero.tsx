import { cx } from '@nerdfish/utils'
import { Section } from '@nerdfish-website/ui/components'
import Image from 'next/image'
import * as React from 'react'
import { tinaField } from 'tinacms/dist/react'
import { BigTitle } from '../components/big-title'
import { PortableText, type Block, type PageBlocksHero } from '~/app/cms'

type Variant = 'default' | 'secondary'

function BlockLayout({
	children,
	variant = 'default',
}: {
	children: React.ReactNode
	variant: Variant
}) {
	return (
		<Section className={cx('relative max-w-none')}>
			{variant === 'default' ? (
				<div className="rounded-semi -z-1 from-accent/50 via-blog-wiki/50 to-blog-project/50 absolute inset-2 bottom-0 bg-[linear-gradient(115deg,var(--tw-gradient-stops))] from-[28%] via-[70%] ring-1 ring-inset ring-black/5 sm:bg-[linear-gradient(145deg,var(--tw-gradient-stops))]" />
			) : null}
			<div
				className={cx('px-md relative lg:container lg:mx-auto', {
					dark: variant === 'default',
				})}
			>
				{children}
			</div>
		</Section>
	)
}

function BlockContent({ children }: { children?: React.ReactNode }) {
	if (!children) return null

	return (
		<div className="max-w-lg">
			<div className="prose dark:prose-invert lg:prose-xl animate-in fade-in !text-primary mt-0 duration-1000">
				{children}
			</div>
		</div>
	)
}

function BlockHeader({ children }: { children: React.ReactNode }) {
	if (!children) return null

	return (
		<div className="animate-in fade-in mb-xs flex flex-col duration-700">
			{children}
		</div>
	)
}

function BlockImage({ children }: { children?: React.ReactNode }) {
	if (!children) return null

	return (
		<div
			className={cx(
				'animate-in fade-in mb-md zoom-in-150 w-full max-w-[50%] flex-none duration-700 md:mb-0',
				'top-1/2 mt-12 max-w-[100%] rounded-xl sm:absolute sm:right-0 sm:mt-0 sm:max-w-[60%] 2xl:-right-1/4',
			)}
		>
			{children}
		</div>
	)
}

export function HeroBlock(data: Block<PageBlocksHero>) {
	const { image, text, title, variant } = data

	return (
		<BlockLayout variant={(variant ?? 'default') as Variant}>
			<BlockImage>
				{image?.src ? (
					<Image
						// sticker effect
						className="[filter:drop-shadow(0px_0px_2px_#fff)] dark:[filter:drop-shadow(0px_0px_2px_#000)]"
						src={image.src}
						width={700}
						height={700}
						loading="eager"
						alt={image.alt ?? ''}
					/>
				) : null}
			</BlockImage>
			<BlockHeader>
				{title ? (
					<BigTitle
						data-tina-field={tinaField(data, 'title')}
						className="text-primary relative font-black"
						value={title}
					/>
				) : null}
			</BlockHeader>
			<BlockContent>
				<PortableText
					data-tina-field={tinaField(data, 'text')}
					content={text}
				/>
			</BlockContent>
		</BlockLayout>
	)
}
