import { cx } from '@repo/lib/utils/base'

const foregroundMap: Record<string, string> = {
	// Blog
	unknown: 'text-blog-unknown group-hover:ring-current',
	wiki: 'text-blog-wiki group-hover:ring-current',
	technical: 'text-blog-technical group-hover:ring-current',
	coaching: 'text-blog-coaching group-hover:ring-current',
	project: 'text-blog-project group-hover:ring-current',
	blog: 'text-blog group-hover:ring-current',

	// Work
	webdesign: 'text-work-webdesign group-hover:ring-current',
	branding: 'text-work-branding group-hover:ring-current',
	print: 'text-work-print group-hover:ring-current',

	// other
	expertise: 'text-foreground-info',
}

export function getCategoryColors(category = 'unkown'): string {
	return foregroundMap[category.toLowerCase()] ?? ''
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
			className={cx({
				'absolute inset-0 flex h-full w-full items-start justify-start':
					!inline,
			})}
		>
			<span
				className={cx(
					getCategoryColors(category),
					'bg-background-muted py-best-friends px-best-friends rounded-base z-10 inline-block w-auto text-sm font-bold shadow-sm ring-2 ring-current transition-colors',
					{
						'top-casual right-casual lg:left-casual absolute lg:right-[unset]':
							!inline,
					},
					className,
				)}
			>
				<span className="sr-only">Category:</span>
				{category}
			</span>
		</div>
	)
}
