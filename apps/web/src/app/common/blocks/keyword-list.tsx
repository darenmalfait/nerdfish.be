import { Marquee } from '@nerdfish/ui'
import * as React from 'react'
import { tinaField } from 'tinacms/dist/react'
import { SectionHeader, SectionHeaderTitle } from '../components'
import { nonNullable } from '../utils'
import { type Block, type PageBlocksKeywordList } from '~/app/cms'

const BlockLayout = ({ children }: { children: React.ReactNode }) => {
	if (!children) return null

	return (
		<section className="py-md flex flex-col items-center">{children}</section>
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
				<Marquee pauseOnHover duration={20000} repeat={5}>
					{keywords?.filter(nonNullable).map((keyword) => (
						<span
							aria-label={keyword}
							key={keyword}
							className="text-7xl font-black uppercase leading-none"
						>
							<span>{keyword}</span>
							<span aria-hidden className="ml-md">
								-
							</span>
						</span>
					))}
				</Marquee>
			</div>
		</BlockLayout>
	)
}
