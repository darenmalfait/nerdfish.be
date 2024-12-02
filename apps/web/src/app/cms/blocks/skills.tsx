import { cx } from '@nerdfish/utils'
import {
	Section,
	SectionHeader,
	SectionHeaderSubtitle,
	SectionHeaderTitle,
} from '@repo/ui/components/section'
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
} from '@repo/ui/icons'
import type * as React from 'react'
import { tinaField } from 'tinacms/dist/react'
import { PortableText } from '../components/portable-text'
import { type Block, type PageBlocksSkills } from '~/app/cms/types'
import { type skills } from '~/tina/schema/blocks/skills.template'

const skillIconMap: Record<(typeof skills)[number], React.ElementType> = {
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

function SkillItem({ skill }: { skill?: string | null }) {
	if (!skill) return null
	if (!Object.keys(skillIconMap).includes(skill)) return null

	const SkillIcon = skillIconMap[skill as keyof typeof skillIconMap]

	return (
		<li className="aspect-1 rounded-container bg-muted col-span-1 flex w-full flex-col items-center justify-center">
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

const BlockLayout = ({ children }: { children: React.ReactNode }) => {
	if (!children) return null

	return (
		<Section>
			<div className="flex flex-col">{children}</div>
		</Section>
	)
}

const SkillsList = ({
	children,
	maxCols,
}: {
	children: React.ReactNode
	maxCols: string
}) => {
	if (!children) return null

	return (
		<div>
			<ul
				className={cx('gap-sm grid grid-cols-2 md:grid-cols-3', {
					'lg:grid-cols-4': maxCols === '4',
					'lg:grid-cols-5': maxCols === '5',
				})}
			>
				{children}
			</ul>
		</div>
	)
}

export function SkillsBlock(data: Block<PageBlocksSkills>) {
	const { title, skills: skillsList, description, layout } = data

	const maxCols = layout?.maxCols ?? '5'

	return (
		<BlockLayout>
			{title ? (
				<SectionHeader>
					<SectionHeaderTitle>{title}</SectionHeaderTitle>
					<SectionHeaderSubtitle className="prose">
						<PortableText content={description} />
					</SectionHeaderSubtitle>
				</SectionHeader>
			) : null}

			<SkillsList maxCols={maxCols}>
				{skillsList?.map((item) => (
					<SkillItem
						key={item}
						skill={item}
						data-tina-field={tinaField(data, 'skills')}
					/>
				))}
			</SkillsList>
		</BlockLayout>
	)
}
