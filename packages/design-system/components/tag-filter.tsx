import { cx } from '@repo/lib/utils/base'
import * as React from 'react'
import { FilterIcon } from '../icons'
import {
	Button,
	Drawer,
	DrawerContent,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
	H5,
	Toggle,
	ToggleGroup,
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from './ui'

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

export type TagFilterTagsProps = {
	className?: string
}

export function TagFilterTags({ className }: TagFilterTagsProps) {
	const { selectedTags, tags, enabledTags, onToggleTag } = useTagFilter()

	return (
		<ToggleGroup
			type="multiple"
			className={cx(
				'col-span-full -mb-4 -mr-4 flex flex-wrap justify-start lg:col-span-10',
				className,
			)}
		>
			{tags.map((tag) => {
				const selected = selectedTags?.includes(tag)
				const disabled = enabledTags?.includes(tag) ? false : !selected

				return (
					<Toggle
						variant="outline"
						disabled={disabled}
						key={tag}
						pressed={selected}
						onPressedChange={() => onToggleTag(tag)}
					>
						{tag}
					</Toggle>
				)
			})}
		</ToggleGroup>
	)
}

export interface TagFilterTitleProps extends React.ComponentProps<typeof H5> {
	as?: React.ElementType
}

export function TagFilterTitle({
	children,
	as = 'h2',
	...props
}: TagFilterTitleProps) {
	const { selectedTags = [] } = useTagFilter()

	return (
		<H5
			as={as}
			className="mb-md gap-sm flex items-center justify-end lg:justify-between"
			{...props}
		>
			<span className="hidden lg:block">{children}</span>
			<Drawer repositionInputs={false}>
				<Tooltip>
					<TooltipTrigger asChild>
						<DrawerTrigger asChild className="lg:hidden">
							<Button
								variant={selectedTags.length > 0 ? 'default' : 'secondary'}
								size="icon"
							>
								<FilterIcon size="sm" className="size-4" />
							</Button>
						</DrawerTrigger>
					</TooltipTrigger>
					<TooltipContent side="left">{children}</TooltipContent>
				</Tooltip>
				<DrawerContent className="max-h-[85vh]">
					<div className="pb-lg container">
						<DrawerHeader>
							<DrawerTitle>{children}</DrawerTitle>
						</DrawerHeader>
						<TagFilterTags className="p-4" />
					</div>
				</DrawerContent>
			</Drawer>
		</H5>
	)
}

export interface TagFilterProps extends TagFilterContextProps {
	children: React.ReactNode
}

export function TagFilter({
	selectedTags = [],
	children,
	...tagsProps
}: TagFilterProps) {
	return (
		<TagFilterContext
			value={React.useMemo(() => {
				return {
					selectedTags,
					...tagsProps,
				}
			}, [selectedTags, tagsProps])}
		>
			{children}
			<TagFilterTags className="hidden lg:flex" />
		</TagFilterContext>
	)
}
