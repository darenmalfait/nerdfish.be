import { H1 } from '@nerdfish/ui'
import { tinaField } from 'tinacms/dist/react'

import { type Block, type PageBlocksKeywordList } from '~/app/cms'

export function KeywordListBlock(data: Block<PageBlocksKeywordList>) {
	const { title, keywords } = data

	return (
		<section className="container mx-auto px-4 py-32">
			<div className="flex flex-col space-y-8 lg:flex-row lg:justify-between lg:space-x-16 lg:space-y-0">
				<div className="w-full max-w-sm xl:max-w-lg">
					<H1
						data-tina-field={tinaField(data, 'title')}
						as="h2"
						className="w-full font-bold"
					>
						{title}
					</H1>
				</div>
				<div
					data-tina-field={tinaField(data, 'keywords')}
					className="grid w-full grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3"
				>
					{keywords?.map((item, i) => (
						<span key={`${item} ${i}`} className="text-primary block text-lg">
							{item}
						</span>
					))}
				</div>
			</div>
		</section>
	)
}
