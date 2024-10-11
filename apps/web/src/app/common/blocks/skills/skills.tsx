import { H1 } from '@nerdfish/ui'
import * as React from 'react'
import { tinaField } from 'tinacms/dist/react'

import {
	FigmaIcon,
	CSSIcon,
	JavascriptIcon,
	NodeIcon,
	ReactIcon,
	SassIcon,
	TypescriptIcon,
	VSCodeIcon,
	HTMLIcon,
	GitIcon,
	NextJSIcon,
} from './icons'
import { type PageBlocksSkills, type Block, PortableText } from '~/app/cms'

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
}

function SkillItem({ skill }: { skill?: string | null }) {
	if (!skill) return null
	if (!Object.keys(skillIconMap).includes(skill)) return null

	const SkillIcon = skillIconMap[skill as keyof typeof skillIconMap]

	return (
		<li className="col-span-1">
			<div className="flex flex-col items-center gap-2 text-center">
				<SkillIcon
					className="h-24 w-24 brightness-0 grayscale dark:invert"
					aria-hidden
				/>
				<span className="capitalize">{skill}</span>
			</div>
		</li>
	)
}

export function SkillsBlock(data: Block<PageBlocksSkills>) {
	const { title, skills: skillsList, description } = data

	return (
		<section className="container mx-auto px-4 py-32">
			<div className="flex flex-col items-center text-center">
				<H1
					data-tina-field={tinaField(data, 'title')}
					as="h2"
					className="mb-12 w-full font-bold"
				>
					{title}
				</H1>
				{description ? (
					<div className="prose text-primary mb-12 max-w-3xl">
						<PortableText content={description} />
					</div>
				) : null}
				<div className="mx-auto max-w-7xl">
					<ul
						data-tina-field={tinaField(data, 'skills')}
						className="grid w-full grid-cols-2 gap-12 md:grid-cols-3 lg:grid-cols-7"
					>
						{skillsList?.map((item) => <SkillItem key={item} skill={item} />)}
					</ul>
				</div>
			</div>
		</section>
	)
}
