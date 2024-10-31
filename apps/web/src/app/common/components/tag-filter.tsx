import {
	Button,
	Drawer,
	DrawerContent,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
	H5,
	ScrollArea,
} from '@nerdfish/ui'
import { cx } from '@nerdfish/utils'
import { Tag } from '@nerdfish-website/ui/components'
import { FilterIcon } from '@nerdfish-website/ui/icons'
import * as React from 'react'

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

type TagsProps = {
	tags: string[]
	enabledTags?: string[]
	selectedTags?: string[]
	onToggleTag: (tag: string) => void
	className?: string
}

function Tags({
	tags,
	enabledTags = [],
	selectedTags = tags,
	onToggleTag,
	className,
	size,
}: TagsProps & {
	size?: React.ComponentProps<typeof Tag>['size']
}) {
	return (
		<div
			className={cx(
				'col-span-full -mb-4 -mr-4 flex flex-wrap justify-start lg:col-span-10',
				className,
			)}
		>
			{tags.map((tag) => {
				const selected = selectedTags.includes(tag)
				const disabled = enabledTags.includes(tag) ? false : !selected

				return (
					<FilterTag
						key={tag}
						tag={tag}
						size={size}
						selected={selected}
						onClick={onToggleTag}
						disabled={disabled}
					/>
				)
			})}
		</div>
	)
}

export function TagFilter({
	title,
	selectedTags = [],
	...tagsProps
}: TagsProps & { title: string }) {
	if (tagsProps.tags.length === 0) return null

	return (
		<div>
			<H5 as="h3" className="mb-md gap-sm flex items-center justify-between">
				{title}
				<Drawer>
					<DrawerTrigger asChild className="lg:hidden">
						<Button
							variant={selectedTags.length > 0 ? 'accent' : 'secondary'}
							size="icon"
						>
							<FilterIcon size="sm" className="size-4" />
						</Button>
					</DrawerTrigger>
					<DrawerContent className="p-md">
						<DrawerHeader>
							<DrawerTitle>{title}</DrawerTitle>
						</DrawerHeader>
						<ScrollArea className="h-[30vh] w-full md:h-auto">
							<Tags
								{...tagsProps}
								className="p-4"
								selectedTags={selectedTags}
							/>
						</ScrollArea>
					</DrawerContent>
				</Drawer>
			</H5>
			<Tags
				{...tagsProps}
				tags={selectedTags}
				selectedTags={selectedTags}
				className="flex lg:hidden"
			/>
			<Tags
				{...tagsProps}
				selectedTags={selectedTags}
				className="hidden lg:flex"
			/>
		</div>
	)
}
