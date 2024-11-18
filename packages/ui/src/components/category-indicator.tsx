import { cx } from '@nerdfish/utils'

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
	expertise: 'text-info',
}

function getCategoryColors(category: string = 'unkown'): string {
	return foregroundMap[category.toLowerCase()] ?? ''
}

interface CategoryIndicatorProps {
	category?: string
	inline?: boolean
	className?: string
}

function CategoryIndicator({
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
					'bg-muted py-sm z-10 inline-block w-auto rounded-xl px-4 text-sm font-bold shadow-sm ring-2 ring-current transition-colors',
					{
						'absolute right-6 top-6 lg:left-6 lg:right-[unset]': !inline,
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

export { CategoryIndicator, getCategoryColors }
