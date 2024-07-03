import { H1, H6 } from '@nerdfish/ui'
import { CategoryIndicator } from '@nerdfish-website/ui/components/category-indicator.tsx'
import { DateFormatter } from '@nerdfish-website/ui/components/date-formatter.tsx'
import Image from 'next/image'
import * as React from 'react'
import { tinaField } from 'tinacms/dist/react'

import { mapWorkData } from '../api'
import { BackToWork } from './misc'
import { PortableText, type WorkQueryQuery } from '~/app/cms'
import { ArticleCard, Header, WorkPath } from '~/app/common'

function WorkContent({ data }: { data: WorkQueryQuery }) {
	const { title, date, heroImg, category, body } = data.work

	const blockData = { ...mapWorkData(data) }
	const { works: allWorks } = blockData

	const relatedWorks = React.useMemo(() => {
		return allWorks
			.filter(
				(work) =>
					work.title !== title &&
					work.date !== date &&
					work.category === category,
			)
			.slice(0, 3)
	}, [allWorks, category, date, title])

	return (
		<>
			<section>
				<div className="container mx-auto mb-14 mt-24 max-w-4xl px-4 lg:mb-24">
					<BackToWork />
				</div>

				<header className="container mx-auto mb-12 mt-6 max-w-4xl px-4">
					<H1 data-tina-field={tinaField(data.work, 'title')}>{title}</H1>
					<div className="relative my-6">
						<CategoryIndicator category={category} inline />
					</div>
					{date ? (
						<H6
							data-tina-field={tinaField(data.work, 'date')}
							as="p"
							variant="secondary"
						>
							<DateFormatter dateString={date} format="dd MMMM yyyy" />
						</H6>
					) : null}
				</header>

				<div
					className="container mx-auto mb-12 max-w-4xl px-4"
					data-tina-field={tinaField(data.work, 'heroImg')}
				>
					{heroImg ? (
						<Image src={heroImg} alt={title} width={900} height={900} />
					) : null}
				</div>
			</section>
			<section
				className="prose dark:prose-invert md:prose-lg lg:prose-xl container mx-auto px-4"
				data-tina-field={tinaField(data.work, 'body')}
			>
				{body ? <PortableText content={body} /> : null}
			</section>
			{relatedWorks.length > 0 ? (
				<section className="container mx-auto mt-24 px-4">
					<Header title="Done reading?" subtitle="Read more related articles" />
					<div className="relative my-16 grid grid-cols-4 gap-x-4 gap-y-16 md:grid-cols-8 lg:grid-cols-12 lg:gap-x-6">
						{relatedWorks.map((work) => {
							return (
								<div key={work.id} className="col-span-4">
									<ArticleCard
										href={`/${WorkPath}/${work.category}/${work._sys.filename}`}
										{...work}
										id={work.id}
									/>
								</div>
							)
						})}
					</div>
				</section>
			) : null}
		</>
	)
}

export { WorkContent }
