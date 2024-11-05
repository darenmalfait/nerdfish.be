import { Headline } from '@nerdfish-website/ui/components'
import * as React from 'react'
import { tinaField } from 'tinacms/dist/react'
import { SectionHeader, SectionHeaderTitle } from '../components'
import { type Block, type PageBlocksKeywordList } from '~/app/cms'

const BlockLayout = ({ children }: { children: React.ReactNode }) => {
	if (!children) return null

	return (
		<section className="py-md fle flex-col items-center">{children}</section>
	)
}

export function KeywordListBlock(data: Block<PageBlocksKeywordList>) {
	const { title, keywords } = data

	return (
		<BlockLayout>
			<SectionHeader>
				<SectionHeaderTitle>{title}</SectionHeaderTitle>
			</SectionHeader>
			<div data-tina-field={tinaField(data, 'keywords')}>
				<Headline>{keywords?.join(' - ') as string}</Headline>
			</div>
		</BlockLayout>
	)
}
