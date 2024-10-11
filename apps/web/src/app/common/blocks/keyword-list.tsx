import { H1 } from '@nerdfish/ui'
import { Section } from '@nerdfish-website/ui/components'
import { tinaField } from 'tinacms/dist/react'
import { type Block, type PageBlocksKeywordList } from '~/app/cms'

export function KeywordListBlock(data: Block<PageBlocksKeywordList>) {
	const { title, keywords } = data

	return (
		<Section data-tina-field={tinaField(data, 'keywords')}>
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
				<ul
					data-tina-field={tinaField(data, 'keywords')}
					className="grid w-full grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3"
				>
					{keywords?.map((item, i) => (
						<li key={`${item} ${i}`} className="text-primary block text-lg">
							{item}
						</li>
					))}
				</ul>
			</div>
		</Section>
	)
}
