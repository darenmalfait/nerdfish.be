import { cx } from '@nerdfish/utils'
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
	WebflowIcon,
} from '@repo/design-system/lib/icons'
import type * as React from 'react'

const skillIconMap: Record<string, React.ElementType> = {
	javascript: JavascriptIcon,
	typescript: TypescriptIcon,
	node: NodeIcon,
	react: ReactIcon,
	sass: SassIcon,
	vscode: VSCodeIcon,
	css: CSSIcon,
	html: HTMLIcon,
	git: GitIcon,
	figma: FigmaIcon,
	next: NextJSIcon,
	tailwind: TailwindIcon,
	sanity: SanityIcon,
	webflow: WebflowIcon,
}

export interface SkillItemProps extends React.ComponentProps<'li'> {
	skill?: keyof typeof skillIconMap
}

export function SkillItem({ skill, className, ...props }: SkillItemProps) {
	if (!skill) return null
	if (!Object.keys(skillIconMap).includes(skill)) return null

	const SkillIcon = skillIconMap[skill]

	if (!SkillIcon) return null

	return (
		<li
			className={cx(
				'aspect-1 rounded-container bg-muted col-span-1 flex w-full flex-col items-center justify-center',
				className,
			)}
			{...props}
		>
			<div className="flex flex-col items-center text-center">
				<SkillIcon
					className="mb-sm h-24 w-24 brightness-0 grayscale dark:invert"
					aria-hidden
				/>
				<span className="font-bold capitalize">{skill}</span>
			</div>
		</li>
	)
}

export interface SkillsProps extends React.ComponentProps<'ul'> {
	maxCols?: number
}

export function Skills({
	children,
	maxCols = 5,
	className,
	...props
}: SkillsProps) {
	if (!children) return null

	return (
		<ul
			{...props}
			className={cx(
				'gap-sm grid grid-cols-2 md:grid-cols-3',
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
