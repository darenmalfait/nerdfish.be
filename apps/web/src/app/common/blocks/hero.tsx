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
				<div className="rounded-semi -z-1 absolute inset-2 bottom-0 bg-[linear-gradient(to_right_top,#38438b,#944b94,#d75a88,#ff7e71,#ffb25f,#ffeb68)] opacity-70" />
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
			<div className="motion-preset-fade motion-preset-slide-up motion-delay-[300ms] prose dark:prose-invert lg:prose-xl !text-primary mt-0">
				{children}
			</div>
		</div>
	)
}

function BlockHeader({ children }: { children: React.ReactNode }) {
	if (!children) return null

	return (
		<div className="motion-preset-fade motion-preset-slide-up motion-delay-[150ms] mb-xs flex flex-col">
			{children}
		</div>
	)
}

function BlockImage({ children }: { children?: React.ReactNode }) {
	if (!children) return null

	return (
		<div
			className={cx(
				'motion-preset-shrink motion-preset-focus mb-md w-auto max-w-[50%] flex-none md:mb-0',
				'top-1/2 mt-12 max-w-[100%] rounded-xl sm:absolute sm:right-0 sm:mt-0 sm:max-w-[60%]',
			)}
		>
			{children}
		</div>
	)
}

export function HeroBlock(
	data: Block<PageBlocksHero> & {
		children?: React.ReactNode
	},
) {
	const { image, text, title, variant, children } = data

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
				{children}
			</BlockContent>
		</BlockLayout>
	)
}
