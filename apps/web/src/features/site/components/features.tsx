import { Grid } from '@repo/design-system/components/grid'
import { MagnetButton } from '@repo/design-system/components/magnet'
import { getTranslations } from '@repo/i18n/server'
import { type VariantProps, cva, cn } from '@repo/lib/utils/class'
import { merge } from '@repo/lib/utils/object'
import { ArrowRight } from 'lucide-react'
import { type ComponentProps, type ReactNode } from 'react'
import { Link } from '~/features/shared/components/link'

function DetailLink({
	href,
	label,
	ariaLabel,
}: {
	href?: string
	label: string
	ariaLabel: string
}) {
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
						aria-label={ariaLabel}
					>
						{label}
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
	/** Caller-supplied icon — keeps Lucide out of this module's graph */
	icon?: ReactNode
	href?: string
}

function Feature({
	icon,
	variant,
	title,
	description,
	href,
	viewMoreLabel,
	readMoreAriaLabel,
	...rest
}: FeatureProps & {
	viewMoreLabel: string
	readMoreAriaLabel: string
}) {
	return (
		<div className={featureCardVariants({ variant })} {...rest}>
			{icon ? (
				<div
					className="mb-casual aspect-1 text-accent flex items-center justify-center [&>svg]:h-5 [&>svg]:shrink-0"
					aria-hidden
				>
					{icon}
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
				<DetailLink
					href={href}
					label={viewMoreLabel}
					ariaLabel={readMoreAriaLabel}
				/>
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

export async function Features({ items, layout: layoutProp }: FeaturesProps) {
	const t = await getTranslations('features')

	const { maxCols, variant } = merge(layoutProp, {
		maxCols: '4',
		variant: 'default',
	})

	return (
		<Grid
			className={cn('gap-acquaintances! auto-rows-auto', {
				'grid-cols-2': maxCols === '2',
				'grid-cols-3': maxCols === '3',
				'grid-cols-4': maxCols === '4',
			})}
			asChild
		>
			<ul>
				{items.map((item, i) => {
					const title = item.title ?? ''

					return (
						<li
							key={`${item.title} ${i}`}
							style={{ animationDelay: `${i * 0.2}s` }}
							className={cn('animate-slide-left-in bg-none lg:col-span-1', {
								'col-span-4': maxCols === '4',
								'col-span-3': maxCols === '3',
								'col-span-2': maxCols === '2',
							})}
						>
							<Feature
								variant={variant}
								viewMoreLabel={t('viewMore', { subject: title })}
								readMoreAriaLabel={t('readMoreAbout', { subject: title })}
								{...item}
							/>
						</li>
					)
				})}
			</ul>
		</Grid>
	)
}
