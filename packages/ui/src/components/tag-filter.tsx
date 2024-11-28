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
				'-mb-4 -mr-4 col-span-full flex flex-wrap justify-start lg:col-span-10',
				className
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
			<H5 as="h3" className="mb-md flex items-center justify-between gap-sm">
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
					<DrawerContent className="max-h-[85vh]">
						<div className="container mx-auto p-md">
							<DrawerHeader>
								<DrawerTitle>{title}</DrawerTitle>
							</DrawerHeader>
							<Tags
								{...tagsProps}
								className="p-4"
								selectedTags={selectedTags}
							/>
						</div>
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
