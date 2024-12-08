import {
	Button,
	Drawer,
	DrawerContent,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
	H5,
} from '@nerdfish/ui'
import { cx } from '@nerdfish/utils'
import * as React from 'react'
import { FilterIcon } from '../icons'
import { Tag } from './tag'

type TagFilterContextProps = {
	tags: string[]
	enabledTags?: string[]
	selectedTags?: string[]
	onToggleTag: (tag: string) => void
}

const TagFilterContext = React.createContext<TagFilterContextProps | null>(null)
TagFilterContext.displayName = 'TagFilterContext'

function useTagFilter(): TagFilterContextProps {
	const context = React.useContext(TagFilterContext)

	if (!context) {
		throw new Error('You should use useTagFilter within an TagFilterContext')
	}

	return context
}

function FilterTag({
	tag,
	selected,
	onClick,
	disabled,
	size,
}: {
	tag: string
	selected: boolean
	onClick: (tag: string) => void
	disabled: boolean
	size?: React.ComponentProps<typeof Tag>['size']
}) {
	const handleClick = React.useCallback(() => {
		onClick(tag)
	}, [tag, onClick])

	return (
		<Tag
			tag={tag}
			selected={selected}
			onClick={handleClick}
			disabled={disabled}
			size={size}
		/>
	)
}

export const TagFilterTags = React.forwardRef<
	HTMLDivElement,
	React.ComponentProps<'div'> & {
		size?: React.ComponentProps<typeof Tag>['size']
	}
>(({ size, className, ...props }, ref) => {
	const { selectedTags, tags, enabledTags, onToggleTag } = useTagFilter()
	return (
		<div
			ref={ref}
			{...props}
			className={cx(
				'col-span-full -mb-4 -mr-4 flex flex-wrap justify-start lg:col-span-10',
				className,
			)}
		>
			{tags.map((tag) => {
				const selected = selectedTags?.includes(tag)
				const disabled = enabledTags?.includes(tag) ? false : !selected

				return (
					<FilterTag
						key={tag}
						tag={tag}
						size={size}
						selected={selected ?? false}
						onClick={onToggleTag}
						disabled={disabled}
					/>
				)
			})}
		</div>
	)
})
TagFilterTags.displayName = 'TagFilterTags'

export const TagFilterTitle = React.forwardRef<
	HTMLHeadingElement,
	React.ComponentProps<typeof H5>
>(({ children, as = 'h2', ...props }, ref) => {
	const { selectedTags = [] } = useTagFilter()

	return (
		<H5
			as={as}
			className="mb-md gap-sm flex items-center justify-between"
			ref={ref}
			{...props}
		>
			{children}
			<Drawer repositionInputs={false}>
				<DrawerTrigger asChild className="lg:hidden">
					<Button
						variant={selectedTags.length > 0 ? 'accent' : 'secondary'}
						size="icon"
					>
						<FilterIcon size="sm" className="size-4" />
					</Button>
				</DrawerTrigger>
				<DrawerContent className="max-h-[85vh]">
					<div className="container">
						<DrawerHeader>
							<DrawerTitle>{children}</DrawerTitle>
						</DrawerHeader>
						<TagFilterTags className="p-4" />
					</div>
				</DrawerContent>
			</Drawer>
		</H5>
	)
})
TagFilterTitle.displayName = 'TagFilterTitle'

export function TagFilter({
	selectedTags = [],
	children,
	...tagsProps
}: { children: React.ReactNode } & TagFilterContextProps) {
	return (
		<TagFilterContext.Provider
			value={React.useMemo(() => {
				return {
					selectedTags,
					...tagsProps,
				}
			}, [selectedTags, tagsProps])}
		>
			{children}
			<TagFilterTags className="hidden lg:flex" />
		</TagFilterContext.Provider>
	)
}
