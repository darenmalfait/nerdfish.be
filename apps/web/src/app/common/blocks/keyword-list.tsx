import { H1 } from '@nerdfish/ui'
import { Section } from '@nerdfish-website/ui/components'
import * as React from 'react'
import { tinaField } from 'tinacms/dist/react'
import { type Block, type PageBlocksKeywordList } from '~/app/cms'

const BlockLayout = ({ children }: { children: React.ReactNode }) => {
	if (!children) return null

	return (
		<Section>
			<div className="flex flex-col space-y-8 lg:flex-row lg:justify-between lg:space-x-16 lg:space-y-0">
				{children}
			</div>
		</Section>
	)
}

const BlockHeader = ({ children }: { children: React.ReactNode }) => {
	if (!children) return null

	return <div className="w-full max-w-sm xl:max-w-lg">{children}</div>
}

const KeywordList = ({ children }: { children: React.ReactNode }) => {
	if (!children) return null

	return (
		<ul className="grid w-full grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
			{children}
		</ul>
	)
}

export function KeywordListBlock(data: Block<PageBlocksKeywordList>) {
	const { title, keywords } = data

	return (
		<BlockLayout>
			<BlockHeader>
				<H1
					data-tina-field={tinaField(data, 'title')}
					as="h2"
					className="w-full font-bold"
				>
					{title}
				</H1>
			</BlockHeader>
			<KeywordList>
				{keywords?.map((item, i) => (
					<li
						key={`${item} ${i}`}
						className="text-primary block text-lg"
						data-tina-field={tinaField(data, 'keywords')}
					>
						{item}
					</li>
				))}
			</KeywordList>
		</BlockLayout>
	)
}
