import { H1 } from '@nerdfish/ui'
import { Section } from '@nerdfish-website/ui/components'
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
} from '@nerdfish-website/ui/icons'
import * as React from 'react'
import { tinaField } from 'tinacms/dist/react'
import { AnimatedText } from '../components/animated-text'
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
			<div className="flex flex-col items-center text-center">{children}</div>
		</Section>
	)
}

const SkillsList = ({ children }: { children: React.ReactNode }) => {
	if (!children) return null

	return (
		<div className="mx-auto max-w-7xl">
			<ul className="gap-lg grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-7">
				{children}
			</ul>
		</div>
	)
}

const BlockContent = ({ children }: { children: React.ReactNode }) => {
	if (!children) return null

	return <div className="prose text-primary mb-xl max-w-3xl">{children}</div>
}

export function SkillsBlock(data: Block<PageBlocksSkills>) {
	const { title, skills: skillsList, description } = data

	return (
		<BlockLayout>
			{title ? (
				<H1
					data-tina-field={tinaField(data, 'title')}
					as="h2"
					className="mb-md w-auto font-bold"
				>
					<AnimatedText value={title} letterClassName="hover:text-primary" />
				</H1>
			) : null}
			<BlockContent>
				<PortableText content={description} />
			</BlockContent>
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
