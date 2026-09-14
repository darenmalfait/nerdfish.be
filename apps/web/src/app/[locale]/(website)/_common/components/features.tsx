'use client'

import { Grid } from '@repo/design-system/components/grid'
import { MagnetButton } from '@repo/design-system/components/magnet'
import { useTranslations } from '@repo/i18n/client'
import { type VariantProps, cva, cn } from '@repo/lib/utils/class'
import { merge } from '@repo/lib/utils/object'
import {
	ArrowRight,
	Code,
	EyeIcon,
	HandPlatterIcon,
	Handshake,
	Layers,
	Layout,
	LayoutDashboard,
	Leaf,
	Lightbulb,
	LineChart,
	MessageSquare,
	Monitor,
	MonitorSmartphone,
	Paintbrush2Icon,
	Palette,
	Rocket,
	Smartphone,
	Users,
	Zap,
} from 'lucide-react'
import { useInView } from 'motion/react'
import { type ComponentProps, useRef } from 'react'
import { Link } from '~/app/[locale]/_common/components/link'

// Explicit map — avoid `import * as Icons from 'lucide-react'` (bundle-barrel-imports)
const featureIcons = {
	MonitorSmartphone,
	LayoutDashboard,
	Paintbrush2Icon,
	HandPlatterIcon,
	// about page historically used Lucide* aliases
	LucideCode: Code,
	LucideMonitor: Monitor,
	LucideHandshake: Handshake,
	LucideRocket: Rocket,
	Lightbulb,
	Layout,
	LineChart,
	Zap,
	Layers,
	Palette,
	Leaf,
	EyeIcon,
	Smartphone,
	MessageSquare,
	Users,
} as const

export type FeatureIconName = keyof typeof featureIcons

function DetailLink({ href, title }: { href?: string; title?: string }) {
	const t = useTranslations('features')
	if (!href) return null

	return (
		<div className="mt-friends">
			<MagnetButton
				className="group -mx-4"
				variant="link"
				render={
					<Link
						href={href}
						className="inline-flex items-center"
						aria-label={`${t('readMoreAbout', { subject: title ?? '' })}`}
					>
						{t('viewMore', {
							subject: title ?? '',
						})}
						<ArrowRight className="ml-best-friends text-accent group-hover:translate-x-bff size-4 transition-transform" />
					</Link>
				}
			/>
		</div>
	)
}

const featureCardVariants = cva(
	'relative flex size-full flex-col items-start',
	{
		variants: {
			variant: {
				default: '',
				secondary: 'rounded-container bg-background-muted p-casual',
			},
		},
		defaultVariants: {
			variant: 'secondary',
		},
	},
)

export interface FeatureProps extends ComponentProps<'div'> {
	variant?: VariantProps<typeof featureCardVariants>['variant']
	title?: string
	description?: string
	icon?: FeatureIconName
	href?: string
}

function Feature({
	icon,
	variant,
	title,
	description,
	href,
	...rest
}: FeatureProps) {
	const Icon = icon ? featureIcons[icon] : null

	return (
		<div className={featureCardVariants({ variant })} {...rest}>
			{Icon ? (
				<div
					className="mb-casual aspect-1 text-accent flex items-center justify-center"
					aria-hidden
				>
					<Icon className="flex h-5 shrink-0" />
				</div>
			) : null}
			<div className="flex h-full flex-col justify-between">
				<div>
					<h3 className="typography-title mb-friends text-foreground flex flex-none items-end">
						{title}
					</h3>
					<p className="text-foreground-muted flex-auto text-lg">
						{description}
					</p>
				</div>
				<DetailLink href={href} title={title ?? ''} />
			</div>
		</div>
	)
}

export interface FeaturesProps extends ComponentProps<typeof Grid> {
	items: FeatureProps[]
	layout?: {
		maxCols?: '2' | '3' | '4'
		variant?: 'default' | 'secondary'
	}
}

export function Features({ items, layout: layoutProp }: FeaturesProps) {
	const ref = useRef<HTMLDivElement>(null)
	const inView = useInView(ref, {
		once: true,
	})

	const { maxCols, variant } = merge(layoutProp, {
		maxCols: '4',
		variant: 'default',
	})

	return (
		<Grid
			ref={ref}
			className={cn('gap-acquaintances! auto-rows-auto', {
				'grid-cols-2': maxCols === '2',
				'grid-cols-3': maxCols === '3',
				'grid-cols-4': maxCols === '4',
			})}
			asChild
		>
			<ul>
				{items.map((item, i) => {
					return (
						<li
							key={`${item.title} ${i}`}
							style={{ animationDelay: `${i * 0.2}s` }}
							className={cn('bg-none opacity-0', {
								'motion-preset-slide-left opacity-100 lg:col-span-1': inView,
								'col-span-4': maxCols === '4',
								'col-span-3': maxCols === '3',
								'col-span-2': maxCols === '2',
							})}
						>
							<Feature variant={variant} {...item} />
						</li>
					)
				})}
			</ul>
		</Grid>
	)
}
