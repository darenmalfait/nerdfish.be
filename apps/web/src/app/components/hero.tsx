import { MagnetButton } from '@repo/design-system/components/magnet'
import {
	Section,
	SectionHeaderSubtitle,
} from '@repo/design-system/components/section'
import { TextSlideUp } from '@repo/design-system/components/text-slide-up'
import { ArrowRightIcon } from '@repo/design-system/icons'
import { cx } from '@repo/lib/utils/base'
import { capitalize } from '@repo/lib/utils/string'
import Image from 'next/image'
import * as React from 'react'
import { Link } from './link'

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

export function HeroSubtitle({ children }: { children?: React.ReactNode }) {
	if (!children) return null

	return (
		<SectionHeaderSubtitle className="prose dark:prose-invert !text-foreground/80 max-w-2xl [&_strong]:font-black">
			{children}
		</SectionHeaderSubtitle>
	)
}

export function HeroTitle({
	title,
	as,
	className,
	...props
}: React.ComponentProps<'h1'> & {
	as?: React.ElementType
}) {
	if (!title) return null

	return (
		<div className="mb-lg flex flex-col">
			<AnimatedText
				{...props}
				as={as ?? 'h1'}
				className={cx(
					'text-foreground font-sans text-4xl font-black leading-none sm:text-[11.6250vw] sm:leading-[11.6250vw] 2xl:text-[12rem] 2xl:leading-[12rem]',
					'text-foreground relative font-black',
					className,
				)}
				value={capitalize(title)}
				aria-label={title}
			/>
		</div>
	)
}

export function HeroCTA({
	children,
	className,
	...props
}: React.ComponentProps<typeof Link>) {
	return (
		<MagnetButton size="lg" asChild>
			<Link {...props} className={cx('flex items-center', className)}>
				{children}
				<ArrowRightIcon className="text-accent ml-sm size-4" />
			</Link>
		</MagnetButton>
	)
}

export type HeroImageProps = React.ComponentProps<typeof Image>

export function HeroImage({ src, className, ...props }: HeroImageProps) {
	if (!src) return null

	return (
		<div
			className={cx(
				'motion-preset-shrink motion-preset-focus mb-md z-30 w-auto max-w-[50%] flex-none md:mb-0',
				'-bottom-2/3 mt-12 max-w-[100%] rounded-xl md:absolute md:right-0 md:mt-0 md:max-w-[60%] lg:-bottom-1/2',
			)}
		>
			<Image
				width={700}
				height={700}
				loading="eager"
				{...props}
				// sticker effect
				className={cx(
					'[filter:drop-shadow(0px_0px_2px_#fff)] dark:[filter:drop-shadow(0px_0px_2px_#000)]',
					className,
				)}
				src={src}
			/>
		</div>
	)
}

export interface HeroContentProps extends React.ComponentProps<'div'> {
	children?: React.ReactNode
}

export function HeroContent({ children, ...props }: HeroContentProps) {
	if (!children) return null

	return (
		<TextSlideUp eager {...props}>
			{children}
		</TextSlideUp>
	)
}

export interface HeroProps extends React.ComponentProps<'div'> {
	variant?: 'default' | 'secondary'
}
export function Hero({ variant = 'default', children }: HeroProps) {
	return (
		<Section
			className={cx('group/section relative', {
				'max-w-none': variant === 'default',
			})}
		>
			{variant === 'default' ? (
				<div className="-z-1 inset-x-md rounded-container lg:inset-x-md absolute inset-y-0 bottom-0 bg-[linear-gradient(to_right_top,#38438b,#944b94,#d75a88,#ff7e71,#ffb25f,#ffeb68)] opacity-100" />
			) : null}
			<div
				className={cx('container relative mx-auto px-0', {
					'px-lg lg:min-h-[40vh]': variant === 'default',
					dark: variant === 'default',
				})}
			>
				<div
					style={
						variant === 'default'
							? ({
									'--colors-foreground-primary': '0 0% 100%',
								} as React.CSSProperties)
							: {}
					}
				>
					{children}
				</div>
			</div>
		</Section>
	)
}
