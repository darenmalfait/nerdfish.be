'use client'

import { TagFilter } from '@repo/design-system/components/tag-filter'
import { Tilt } from '@repo/design-system/components/tilt'
import {
	CSSIcon,
	FigmaIcon,
	GitIcon,
	HTMLIcon,
	JavascriptIcon,
	NextJSIcon,
	NodeIcon,
	ReactIcon,
	SanityIcon,
	SassIcon,
	TailwindIcon,
	TypescriptIcon,
	VSCodeIcon,
} from '@repo/design-system/icons'
import { cn } from '@repo/lib/utils/class'
import type * as React from 'react'

export const skills = [
	{
		name: 'javascript',
		category: ['frontend', 'backend'],
		icon: JavascriptIcon,
	},
	{
		name: 'typescript',
		category: ['frontend', 'backend'],
		icon: TypescriptIcon,
	},
	{
		name: 'node',
		category: ['backend'],
		icon: NodeIcon,
	},
	{
		name: 'react',
		category: ['frontend'],
		icon: ReactIcon,
	},
	{
		name: 'sass',
		category: ['frontend'],
		icon: SassIcon,
	},
	{
		name: 'tailwind',
		category: ['frontend'],
		icon: TailwindIcon,
	},
	{
		name: 'sanity',
		category: ['frontend'],
		icon: SanityIcon,
	},
	{
		name: 'vscode',
		category: ['frontend'],
		icon: VSCodeIcon,
	},
	{
		name: 'css',
		category: ['frontend'],
		icon: CSSIcon,
	},
	{
		name: 'html',
		category: ['frontend'],
		icon: HTMLIcon,
	},
	{
		name: 'git',
		category: ['frontend', 'backend'],
		icon: GitIcon,
	},
	{
		name: 'figma',
		category: ['design'],
		icon: FigmaIcon,
	},
	{
		name: 'next',
		category: ['frontend', 'backend'],
		icon: NextJSIcon,
	},
]

const skillIconMap = Object.fromEntries(
	skills.map(({ name, icon }) => [name, icon]),
) as Record<string, React.ElementType>

export interface SkillItemProps extends React.ComponentProps<typeof Tilt> {
	skill?: keyof typeof skillIconMap
}

export function SkillItem({ skill, className, ...props }: SkillItemProps) {
	if (!skill) return null
	if (!Object.keys(skillIconMap).includes(skill)) return null

	const SkillIcon = skillIconMap[skill]

	if (!SkillIcon) return null

	return (
		<Tilt
			isReverse
			as="li"
			className={cn(
				'rounded-container bg-background-muted group/skill relative col-span-1 flex aspect-square w-full flex-col items-center justify-center overflow-hidden',
				className,
			)}
			{...props}
		>
			<div
				className={cn(
					'flex flex-col items-center text-center',
					'transition-opacity duration-300 group-hover/skill:opacity-100',
				)}
			>
				<SkillIcon
					className="mb-best-friends h-24 w-24 brightness-0 grayscale dark:invert"
					aria-hidden
				/>
				<div className="group-hover/skill:motion-preset-fade absolute inset-0 hidden size-full backdrop-blur-2xl group-hover/skill:block" />
			</div>
			<div className="absolute inset-0 flex size-full items-center justify-center">
				<span
					className={cn(
						'text-lg font-bold capitalize opacity-0 transition-opacity duration-300 group-hover/skill:opacity-100',
					)}
				>
					{skill}
				</span>
			</div>
		</Tilt>
	)
}

export type SkillsFilterProps = Omit<
	React.ComponentProps<typeof TagFilter>,
	'tags'
>

export function SkillsFilter({ ...props }: SkillsFilterProps) {
	const tags = [...new Set(skills.map(({ category }) => category).flat())]

	return <TagFilter {...props} tags={tags} />
}

export interface SkillsProps extends React.ComponentProps<'ul'> {
	maxCols?: number
	hideFilter?: boolean
}

export function Skills({
	children,
	maxCols = 5,
	className,
	hideFilter,
	...props
}: SkillsProps) {
	if (!children) return null

	return (
		<ul
			{...props}
			className={cn(
				'gap-friends grid grid-cols-2 md:grid-cols-3',
				{
					'lg:grid-cols-4': maxCols === 4,
					'lg:grid-cols-5': maxCols === 5,
				},
				className,
			)}
		>
			{children}
		</ul>
	)
}
