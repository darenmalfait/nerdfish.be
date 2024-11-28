import {
	Section,
	SectionHeader,
	SectionHeaderSubtitle,
	SectionHeaderTitle,
} from '@repo/ui/components'
import {
	CSSIcon,
	FigmaIcon,
	GitIcon,
	HTMLIcon,
	JavascriptIcon,
	NextJSIcon,
	NodeIcon,
	ReactIcon,
	SassIcon,
	TailwindIcon,
	TypescriptIcon,
	VSCodeIcon,
} from '@repo/ui/icons'
import type * as React from 'react'
import { tinaField } from 'tinacms/dist/react'
import { type Block, type PageBlocksSkills, PortableText } from '~/app/cms'
import type { skills } from '~/tina/schema/blocks/skills.template'

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
}

function SkillItem({ skill }: { skill?: string | null }) {
	if (!skill) return null
	if (!Object.keys(skillIconMap).includes(skill)) return null

	const SkillIcon = skillIconMap[skill as keyof typeof skillIconMap]

	return (
		<li className="col-span-1 flex aspect-1 w-full flex-col items-center justify-center rounded-container bg-muted">
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

const SkillsList = ({ children }: { children: React.ReactNode }) => {
	if (!children) return null

	return (
		<div>
			<ul className="grid grid-cols-2 gap-sm md:grid-cols-3 lg:grid-cols-5">
				{children}
			</ul>
		</div>
	)
}

export function SkillsBlock(data: Block<PageBlocksSkills>) {
	const { title, skills: skillsList, description } = data

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

			<SkillsList>
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
