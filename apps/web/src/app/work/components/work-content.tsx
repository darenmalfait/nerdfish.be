import { H1 } from '@nerdfish/ui'
import { cx } from '@nerdfish/utils'
import { CategoryIndicator } from '@nerdfish-website/ui/components'
import Image from 'next/image'
import * as React from 'react'
import { tinaField } from 'tinacms/dist/react'
import { mapWorkData } from '../api'
import { BackToWork } from './misc'
import { PortableText, type WorkQueryQuery } from '~/app/cms'
import { ArticleCard, Header, WorkPath } from '~/app/common'

const prose = 'prose dark:prose-invert md:prose-lg lg:prose-xl max-w-4xl'

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
			<section className="container mx-auto mb-8 mt-24 max-w-4xl px-4">
				<div className="mb-6">
					<BackToWork />
				</div>

				<header className={cx('flex flex-col', prose)}>
					<H1 className="!mb-0" data-tina-field={tinaField(data.work, 'title')}>
						{title}
					</H1>
					<div className="relative">
						<CategoryIndicator category={category} inline />
					</div>
				</header>
			</section>
			{heroImg ? (
				<section className={cx(prose, 'mx-auto mb-12 px-4')}>
					<div
						className="rounded-semi overflow-hidden"
						data-tina-field={tinaField(data.work, 'heroImg')}
					>
						<Image src={heroImg} alt={title} width={900} height={900} />
					</div>
				</section>
			) : null}
			<section
				className="prose dark:prose-invert md:prose-lg lg:prose-xl container mx-auto max-w-4xl px-4"
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
										date={undefined}
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
