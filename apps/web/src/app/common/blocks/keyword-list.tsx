import { H1, Marquee } from '@nerdfish/ui'
import { nonNullable } from '@nerdfish-website/lib/utils'
import * as React from 'react'
import { tinaField } from 'tinacms/dist/react'
import { SectionHeader, SectionHeaderTitle } from '../components'
import { type Block, type PageBlocksKeywordList } from '~/app/cms'

const BlockLayout = ({ children }: { children: React.ReactNode }) => {
	if (!children) return null

	return (
		<section className="py-xl flex flex-col items-center">{children}</section>
	)
}

export function KeywordListBlock(data: Block<PageBlocksKeywordList>) {
	const { title, keywords } = data

	return (
		<BlockLayout>
			<SectionHeader>
				<SectionHeaderTitle>{title}</SectionHeaderTitle>
			</SectionHeader>
			<div
				data-tina-field={tinaField(data, 'keywords')}
				className="max-w-full overflow-hidden"
			>
				<Marquee pauseOnHover duration={20000} repeat={5}>
					{nonNullable(keywords ?? []).map((keyword) => (
						<H1
							as="span"
							variant="primary"
							aria-label={keyword}
							key={keyword}
							className="uppercase"
						>
							<span>{keyword}</span>
							<span aria-hidden className="ml-md">
								-
							</span>
						</H1>
					))}
				</Marquee>
			</div>
		</BlockLayout>
	)
}
