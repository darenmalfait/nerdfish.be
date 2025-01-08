import { cx } from '@nerdfish/utils'
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
			className={cx(
				'aspect-1 rounded-container bg-muted group/skill relative col-span-1 flex w-full flex-col items-center justify-center overflow-hidden',
				className,
			)}
			{...props}
		>
			<div
				className={cx(
					'flex flex-col items-center text-center',
					'transition-opacity duration-300 group-hover/skill:opacity-100',
				)}
			>
				<SkillIcon
					className="mb-sm h-24 w-24 brightness-0 grayscale dark:invert"
					aria-hidden
				/>
				<div className="group-hover/skill:motion-preset-fade absolute inset-0 hidden size-full backdrop-blur-2xl group-hover/skill:block" />
			</div>
			<div className="absolute inset-0 flex size-full items-center justify-center">
				<span
					className={cx(
						'text-lg font-bold capitalize opacity-0 transition-opacity duration-300 group-hover/skill:opacity-100',
					)}
				>
					{skill}
				</span>
			</div>
		</Tilt>
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
