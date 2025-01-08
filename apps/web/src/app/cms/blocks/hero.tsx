import { cx } from '@nerdfish/utils'
import {
	Section,
	SectionHeaderSubtitle,
} from '@repo/design-system/components/section'
import { TextSlideUp } from '@repo/design-system/components/text-slide-up'
import { capitalize } from '@repo/design-system/lib/utils/capitalize'
import Image from 'next/image'
import * as React from 'react'
import { tinaField } from 'tinacms/dist/react'
import { PortableText } from '~/app/cms/components/portable-text'
import { type PageBlocksHero } from '~/app/cms/types'

const AnimatedText = React.forwardRef<
	HTMLSpanElement,
	Omit<React.ComponentPropsWithRef<'span'>, 'children'> & {
		as?: React.ElementType
		value?: string
		letterClassName?: string
	}
>(function AnimatedText({ as, value, letterClassName, ...props }, ref) {
	const Tag = as ?? 'span'

	const letters = value?.split('')

	return (
		<Tag {...props} aria-label={value} ref={ref}>
			{letters?.map((letter, index) => (
				<span
					className={cx(
						'inline-block transition-colors',
						'hover:animate-rubber cursor-default',
						letterClassName,
					)}
					key={`${letter}-${index}`}
				>
					{letter === ' ' ? '\u00A0' : letter}
				</span>
			))}
		</Tag>
	)
})

type Variant = 'default' | 'secondary'

const bigTitleClassNames =
	'text-primary font-sans text-4xl font-black leading-none sm:text-[11.6250vw] sm:leading-[11.6250vw] 2xl:text-[12rem] 2xl:leading-[12rem]'

export const BigTitle = React.forwardRef<
	HTMLHeadingElement,
	Omit<React.ComponentPropsWithRef<'h1'>, 'children'> & {
		as?: React.ElementType
		value?: string
	}
>(function BigTitle({ as, className, value, ...props }, ref) {
	return (
		<AnimatedText
			as={as ?? 'h1'}
			{...props}
			className={cx(bigTitleClassNames, className)}
			value={capitalize(value)}
			aria-label={value}
			ref={ref}
		/>
	)
})

function BlockLayout({
	children,
	variant = 'default',
}: {
	children: React.ReactNode
	variant: Variant
}) {
	return (
		<Section
			className={cx('group relative', { 'max-w-none': variant === 'default' })}
		>
			{variant === 'default' ? (
				<div className="-z-1 inset-x-md rounded-container lg:inset-x-md absolute inset-y-0 bottom-0 bg-[linear-gradient(to_right_top,#38438b,#944b94,#d75a88,#ff7e71,#ffb25f,#ffeb68)] opacity-70" />
			) : null}
			<div
				className={cx('container relative mx-auto px-0', {
					'px-lg lg:min-h-[40vh]': variant === 'default',
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
		<SectionHeaderSubtitle className="prose dark:prose-invert !text-primary/80 max-w-2xl [&_strong]:font-black">
			{children}
		</SectionHeaderSubtitle>
	)
}

function BlockHeader({ children }: { children: React.ReactNode }) {
	if (!children) return null

	return <div className="mb-lg flex flex-col">{children}</div>
}

function BlockImage({ children }: { children?: React.ReactNode }) {
	if (!children) return null

	return (
		<div
			className={cx(
				'motion-preset-shrink motion-preset-focus mb-md z-30 w-auto max-w-[50%] flex-none md:mb-0',
				'-bottom-2/3 mt-12 max-w-[100%] rounded-xl md:absolute md:right-0 md:mt-0 md:max-w-[60%] lg:-bottom-1/2',
			)}
		>
			{children}
		</div>
	)
}

export function HeroBlock(
	data: PageBlocksHero & {
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
						alt={image.alt ?? title ?? ''}
					/>
				) : null}
			</BlockImage>
			<TextSlideUp eager>
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
			</TextSlideUp>
		</BlockLayout>
	)
}
