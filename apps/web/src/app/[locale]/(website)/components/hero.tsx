import { MagnetButton } from '@repo/design-system/components/magnet'
import {
	Section,
	SectionHeader,
	SectionHeaderSubtitle,
	SectionHeaderTitle,
} from '@repo/design-system/components/section'
import { ArrowRightIcon } from '@repo/design-system/icons'
import { cn } from '@repo/lib/utils/class'
import { capitalize } from '@repo/lib/utils/string'
import Image from 'next/image'
import { type ComponentProps, type ElementType, type ReactNode } from 'react'
import { Link } from './link'

export function HeroSubtitle({ children }: { children?: ReactNode }) {
	if (!children) return null

	return (
		<SectionHeaderSubtitle className="typography mt-friends [&_strong]:font-black">
			{children}
		</SectionHeaderSubtitle>
	)
}

export function HeroTitle({
	title,
	as,
	className,
	...props
}: ComponentProps<'h1'> & {
	as?: ElementType
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
}: ComponentProps<typeof Link>) {
	return (
		<MagnetButton
			size="xl"
			className="mt-acquaintances group"
			render={
				<Link {...props} className={cn('flex items-center', className)}>
					{children}
					<ArrowRightIcon className="text-accent ml-best-friends group-hover:translate-x-sm size-6 transition-all" />
				</Link>
			}
		/>
	)
}

export type HeroImageProps = ComponentProps<typeof Image>

export function HeroImage({ src, className, ...props }: HeroImageProps) {
	if (!src) return null

	return (
		<div
			className={cn(
				'motion-preset-shrink motion-preset-focus mb-friends z-30 w-auto max-w-[50%] flex-none md:mb-0',
				'rounded-base -bottom-2/3 mt-12 max-w-full md:absolute md:right-0 md:mt-0 md:max-w-[60%] lg:-bottom-1/2',
			)}
		>
			<Image
				width={700}
				height={700}
				loading="eager"
				{...props}
				// sticker effect
				className={cn(
					'filter-[drop-shadow(0px_0px_2px_#fff)] dark:filter-[drop-shadow(0px_0px_2px_#000)]',
					className,
				)}
				src={src}
			/>
		</div>
	)
}

export interface HeroContentProps extends ComponentProps<'div'> {
	children?: ReactNode
}

export function HeroContent({ children, ...props }: HeroContentProps) {
	if (!children) return null

	return (
		<SectionHeader eager {...props}>
			{children}
		</SectionHeader>
	)
}

export type HeroProps = ComponentProps<'div'>

export function Hero({ children }: HeroProps) {
	return (
		<Section className={cn('group/section relative')}>
			<div className="relative container mx-auto px-0">{children}</div>
		</Section>
	)
}
