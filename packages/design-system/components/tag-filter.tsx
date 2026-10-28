'use client'

import { Button } from '@nerdfish/react/button'
import {
	Drawer,
	DrawerContent,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from '@nerdfish/react/drawer'
import { Toggle } from '@nerdfish/react/toggle'
import { ToggleGroup } from '@nerdfish/react/toggle-group'
import { cn } from '@repo/lib/utils/class'
import { FilterIcon } from 'lucide-react'
import {
	type ComponentProps,
	createContext,
	type ElementType,
	type ReactNode,
	use,
	useMemo,
} from 'react'
type TagFilterContextValue = {
	state: {
		tags: string[]
		enabledTags?: string[]
		selectedTags: string[]
	}
	actions: {
		toggleTag: (tag: string) => void
		clear?: () => void
	}
	meta: {
		clearLabel: string
	}
}

const NO_TAGS: string[] = []

const TagFilterContext = createContext<TagFilterContextValue | null>(null)
TagFilterContext.displayName = 'TagFilterContext'

function useTagFilter(): TagFilterContextValue {
	const context = use(TagFilterContext)

	if (!context) {
		throw new Error('You should use useTagFilter within an TagFilterContext')
	}

	return context
}

export type TagFilterTagsProps = {
	className?: string
}

function TagFilterClear() {
	const {
		state: { selectedTags },
		actions: { clear },
		meta: { clearLabel },
	} = useTagFilter()

	if (!clear || !selectedTags.length) return null

	return (
		<Button size="sm" variant="link" onClick={clear}>
			{clearLabel}
		</Button>
	)
}

export function TagFilterTags({ className }: TagFilterTagsProps) {
	const {
		state: { selectedTags, tags, enabledTags },
		actions: { toggleTag },
	} = useTagFilter()

	return (
		<ToggleGroup
			multiple
			className={cn(
				'-mr-friends gap-best-friends -mb-friends col-span-full flex flex-wrap justify-start lg:col-span-10',
				className,
			)}
		>
			{tags.map((tag) => {
				const isSelected = selectedTags.includes(tag)
				const isDisabled = enabledTags?.includes(tag) ? false : !isSelected

				return (
					<Toggle
						variant="outline"
						disabled={isDisabled}
						key={tag}
						pressed={isSelected}
						onPressedChange={() => toggleTag(tag)}
					>
						{tag}
					</Toggle>
				)
			})}
			<TagFilterClear />
		</ToggleGroup>
	)
}

export interface TagFilterTitleProps extends ComponentProps<'h5'> {
	as?: ElementType
}

export function TagFilterTitle({
	children,
	as,
	className,
	...props
}: TagFilterTitleProps) {
	const Element = as ?? 'h5'
	return (
		<Element
			className={cn(
				'mb-friends gap-best-friends flex items-center justify-start',
				className,
			)}
			{...props}
		>
			<span className="hidden lg:block">{children}</span>
			<Drawer repositionInputs={false}>
				<DrawerTrigger asChild className="lg:hidden">
					<Button>
						<span className="mr-best-friends">{children}</span>
						<FilterIcon className="size-4" />
					</Button>
				</DrawerTrigger>
				<DrawerContent className="max-h-[85vh]">
					<div className="pb-lg container">
						<DrawerHeader>
							<DrawerTitle>{children}</DrawerTitle>
						</DrawerHeader>
						<TagFilterTags className="p-4" />
					</div>
				</DrawerContent>
			</Drawer>
		</Element>
	)
}

export interface TagFilterProps {
	children: ReactNode
	tags: string[]
	enabledTags?: string[]
	selectedTags?: string[]
	onToggleTag: (tag: string) => void
	onClear?: () => void
	clearLabel?: string
}

export function TagFilter({
	children,
	tags,
	enabledTags,
	selectedTags = NO_TAGS,
	onToggleTag,
	onClear,
	clearLabel = 'Clear filter',
}: TagFilterProps) {
	return (
		<TagFilterContext
			value={useMemo(
				() => ({
					state: { tags, enabledTags, selectedTags },
					actions: { toggleTag: onToggleTag, clear: onClear },
					meta: { clearLabel },
				}),
				[tags, enabledTags, selectedTags, onToggleTag, onClear, clearLabel],
			)}
		>
			{children}
			<TagFilterTags className="hidden lg:flex" />
		</TagFilterContext>
	)
}
