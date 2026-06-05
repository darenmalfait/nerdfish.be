import { Badge } from '@nerdfish/react/badge'
import { cn } from '@repo/lib/utils/class'

type CategoryColors = {
	background: string
	foreground: string
	ring?: string
}

const categoryColorMap: Record<string, CategoryColors> = {
	// Blog
	unknown: {
		background: 'bg-background-muted',
		foreground: 'text-blog-unknown',
		ring: 'group-hover:ring-current',
	},
	wiki: {
		background: 'bg-warning-background',
		foreground: 'text-blog-wiki',
		ring: 'group-hover:ring-current',
	},
	technical: {
		background: 'bg-success-background',
		foreground: 'text-blog-technical',
		ring: 'group-hover:ring-current',
	},
	coaching: {
		background: 'bg-destructive-background',
		foreground: 'text-blog-coaching',
		ring: 'group-hover:ring-current',
	},
	project: {
		background: 'bg-background-muted',
		foreground: 'text-blog-project',
		ring: 'group-hover:ring-current',
	},
	blog: {
		background: 'bg-info-background',
		foreground: 'text-blog',
		ring: 'group-hover:ring-current',
	},

	// Work
	webdesign: {
		background: 'bg-destructive-background',
		foreground: 'text-work-webdesign',
		ring: 'group-hover:ring-current',
	},
	branding: {
		background: 'bg-success-background',
		foreground: 'text-work-branding',
		ring: 'group-hover:ring-current',
	},
	print: {
		background: 'bg-info-background',
		foreground: 'text-work-print',
		ring: 'group-hover:ring-current',
	},
	product: {
		background: 'bg-warning-background',
		foreground: 'text-work',
		ring: 'group-hover:ring-current',
	},

	// other
	expertise: {
		background: 'bg-background-muted',
		foreground: 'text-foreground-info',
	},
}

function getCategoryStyle(
	category = 'unknown',
	part: keyof CategoryColors,
): string {
	return categoryColorMap[category.toLowerCase()]?.[part] ?? ''
}

export function getCategoryBackground(category = 'unknown'): string {
	return getCategoryStyle(category, 'background')
}

export function getCategoryForeground(category = 'unknown'): string {
	return getCategoryStyle(category, 'foreground')
}

export function getCategoryRing(category = 'unknown'): string {
	return getCategoryStyle(category, 'ring')
}

export interface CategoryIndicatorProps {
	category?: string
	inline?: boolean
	className?: string
}

export function CategoryIndicator({
	category = 'unknown',
	inline,
	className,
}: CategoryIndicatorProps) {
	return (
		<div
			className={cn({
				'absolute inset-0 flex h-full w-full items-start justify-start':
					!inline,
			})}
		>
			<Badge
				variant="default"
				className={cn(
					'px-best-friends py-best-friends relative z-10 text-sm',
					getCategoryBackground(category),
					getCategoryForeground(category),
					{
						'top-friends right-friends lg:left-casual absolute lg:right-[unset]':
							!inline,
					},
					className,
				)}
			>
				<span className="sr-only">Category:</span>
				{category}
			</Badge>
		</div>
	)
}
