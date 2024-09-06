import { Button, Drawer, H5 } from '@nerdfish/ui'
import { cx } from '@nerdfish/utils'
import { Tag } from '@nerdfish-website/ui/components/tag.tsx'
import { Icons } from '@nerdfish-website/ui/icons'
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
	return (
		<div className="container mx-auto my-16 px-4">
			<H5 as="h3" className="mb-8 flex items-center justify-between gap-2">
				{title}
				<Drawer.Root>
					<Drawer.Trigger asChild className="lg:hidden">
						<Button
							variant={selectedTags.length > 0 ? 'nerdfish' : 'secondary'}
							size="icon"
						>
							<Icons.Filter size="sm" className="size-4" />
						</Button>
					</Drawer.Trigger>
					<Drawer.Content className="p-4">
						<Drawer.Header>
							<Drawer.Title>{title}</Drawer.Title>
						</Drawer.Header>
						<Tags {...tagsProps} className="p-4" selectedTags={selectedTags} />
					</Drawer.Content>
				</Drawer.Root>
			</H5>
			<Tags
				{...tagsProps}
				selectedTags={selectedTags}
				className="hidden lg:flex"
			/>
		</div>
	)
}
