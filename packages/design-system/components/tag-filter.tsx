import { cx } from '@repo/lib/utils/base'
import * as React from 'react'
import { FilterIcon } from '../icons'
import { Tag } from './tag'
import {
	Button,
	Drawer,
	DrawerContent,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
	H5,
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

export interface TagFilterTagProps
	extends Omit<React.ComponentProps<typeof Tag>, 'onClick'> {
	tag: string
	selected: boolean
	onClick: (tag: string) => void
}

function FilterTag({
	tag,
	selected,
	onClick,
	disabled,
	size,
}: TagFilterTagProps) {
	return (
		<Tag
			tag={tag}
			selected={selected}
			onClick={() => onClick(tag)}
			disabled={disabled}
			size={size}
		/>
	)
}

export interface TagFilterTagsProps extends React.ComponentProps<'div'> {
	size?: React.ComponentProps<typeof Tag>['size']
}

export function TagFilterTags({
	size,
	className,
	...props
}: TagFilterTagsProps) {
	const { selectedTags, tags, enabledTags, onToggleTag } = useTagFilter()

	return (
		<div
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
			className="mb-md gap-sm flex items-center justify-between"
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
