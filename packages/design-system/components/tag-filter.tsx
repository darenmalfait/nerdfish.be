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
import { cx } from '@repo/lib/utils/base'
import {
	type ComponentProps,
	createContext,
	type ElementType,
	type ReactNode,
	useContext,
	useMemo,
} from 'react'
import { FilterIcon } from '../icons'

type TagFilterContextProps = {
	tags: string[]
	enabledTags?: string[]
	selectedTags?: string[]
	onToggleTag: (tag: string) => void
	renderAdditionalItems?: () => ReactNode
}

const TagFilterContext = createContext<TagFilterContextProps | null>(null)
TagFilterContext.displayName = 'TagFilterContext'

function useTagFilter(): TagFilterContextProps {
	const context = useContext(TagFilterContext)

	if (!context) {
		throw new Error('You should use useTagFilter within an TagFilterContext')
	}

	return context
}

export type TagFilterTagsProps = {
	className?: string
}

export function TagFilterTags({ className }: TagFilterTagsProps) {
	const {
		selectedTags,
		tags,
		enabledTags,
		onToggleTag,
		renderAdditionalItems,
	} = useTagFilter()

	return (
		<ToggleGroup
			multiple
			className={cx(
				'-mr-friends gap-best-friends -mb-friends col-span-full flex flex-wrap justify-start lg:col-span-10',
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
			{renderAdditionalItems?.()}
		</ToggleGroup>
	)
}

export interface TagFilterTitleProps extends ComponentProps<'h5'> {
	as?: ElementType
	renderAdditionalItems?: () => ReactNode
}

export function TagFilterTitle({
	children,
	as,
	...props
}: TagFilterTitleProps) {
	const Element = as ?? 'h5'
	return (
		<Element
			className="mb-friends gap-best-friends flex items-center justify-start"
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

export interface TagFilterProps extends TagFilterContextProps {
	children: ReactNode
	renderAdditionalItems?: () => ReactNode
}

export function TagFilter({
	selectedTags = [],
	children,
	renderAdditionalItems,
	...tagsProps
}: TagFilterProps) {
	return (
		<TagFilterContext
			value={useMemo(() => {
				return {
					selectedTags,
					renderAdditionalItems,
					...tagsProps,
				}
			}, [renderAdditionalItems, selectedTags, tagsProps])}
		>
			{children}
			<TagFilterTags className="hidden lg:flex" />
		</TagFilterContext>
	)
}
