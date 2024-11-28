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

function getCategoryColors(category = 'unkown'): string {
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
					'z-10 inline-block w-auto rounded-xl bg-muted px-4 py-sm font-bold text-sm shadow-sm ring-2 ring-current transition-colors',
					{
						'absolute top-6 right-6 lg:right-[unset] lg:left-6': !inline,
					},
					className
				)}
			>
				<span className="sr-only">Category:</span>
				{category}
			</span>
		</div>
	)
}

export { CategoryIndicator, getCategoryColors }
