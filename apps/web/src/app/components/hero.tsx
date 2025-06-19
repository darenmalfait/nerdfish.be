import { MagnetButton } from '@repo/design-system/components/magnet'
import {
	Section,
	SectionHeader,
	SectionHeaderSubtitle,
	SectionHeaderTitle,
} from '@repo/design-system/components/section'
import { ArrowRightIcon } from '@repo/design-system/icons'
import { cx } from '@repo/lib/utils/base'
import { capitalize } from '@repo/lib/utils/string'
import Image from 'next/image'
import * as React from 'react'
import { Link } from './link'

export function HeroSubtitle({ children }: { children?: React.ReactNode }) {
	if (!children) return null

	return (
		<SectionHeaderSubtitle className="prose [&_strong]:font-black">
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
		<SectionHeaderTitle {...props} as={as ?? 'h1'}>
			{capitalize(title)}
		</SectionHeaderTitle>
	)
}

export function HeroCTA({
	children,
	className,
	...props
}: React.ComponentProps<typeof Link>) {
	return (
		<MagnetButton size="xl" className="mt-xl group" asChild>
			<Link {...props} className={cx('flex items-center', className)}>
				{children}
				<ArrowRightIcon className="text-brand ml-sm group-hover:translate-x-sm size-6 transition-all" />
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
		<SectionHeader eager {...props}>
			{children}
		</SectionHeader>
	)
}

export type HeroProps = React.ComponentProps<'div'>

export function Hero({ children }: HeroProps) {
	return (
		<Section className={cx('group/section relative')}>
			<div className="container relative mx-auto px-0">{children}</div>
		</Section>
	)
}
