import {
	SectionHeader,
	SectionHeaderTitle,
} from '@repo/design-system/components/section'
import { H1, Marquee } from '@repo/design-system/components/ui'
import { nonNullable } from '@repo/design-system/lib/utils/array'
import type * as React from 'react'
import { tinaField } from 'tinacms/dist/react'
import { type PageBlocksKeywordList } from '~/app/cms/types'

const BlockLayout = ({ children }: { children: React.ReactNode }) => {
	if (!children) return null

	return (
		<section className="py-xl flex flex-col items-center">{children}</section>
	)
}

export function KeywordListBlock(data: PageBlocksKeywordList) {
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
