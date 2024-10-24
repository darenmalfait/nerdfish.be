import { H1 } from '@nerdfish/ui'
import { cx } from '@nerdfish/utils'
import {
	ArticleCard,
	ArticleCardCategory,
	ArticleCardContent,
	ArticleCardDescription,
	ArticleCardImage,
	ArticleCardTitle,
	CategoryIndicator,
	Section,
} from '@nerdfish-website/ui/components'
import Image from 'next/image'
import * as React from 'react'
import { tinaField } from 'tinacms/dist/react'
import { mapWorkData } from '../api'
import { getWorkPath } from '../utils'
import { BackToWork } from './misc'
import { PortableText, type WorkQueryQuery } from '~/app/cms'
import {
	SectionHeader,
	SectionHeaderSubtitle,
	SectionHeaderTitle,
} from '~/app/common'
import { AnimatedText } from '~/app/common/components/animated-text'

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
		<article>
			<Section className="max-w-4xl">
				<div className="mb-lg">
					<BackToWork />
				</div>
				<header className={cx('!mb-lg flex max-w-4xl flex-col', prose)}>
					<H1
						data-tina-field={tinaField(data.work, 'title')}
						className="!m-0 w-auto"
					>
						<AnimatedText value={title} letterClassName="hover:text-primary" />
					</H1>
					<div className="mt-xs relative">
						<CategoryIndicator category={category} inline />
					</div>
				</header>
				{heroImg ? (
					<div className={cx(prose, 'mb-xl mx-auto')}>
						<div
							className="rounded-semi overflow-hidden"
							data-tina-field={tinaField(data.work, 'heroImg')}
						>
							{/* TODO: add aria description */}
							<Image
								aria-hidden
								src={heroImg}
								alt={title}
								width={900}
								height={900}
							/>
						</div>
					</div>
				) : null}

				{body ? (
					<div className={prose}>
						<PortableText
							data-tina-field={tinaField(data.work, 'body')}
							content={body}
						/>
					</div>
				) : null}
			</Section>

			{relatedWorks.length > 0 ? (
				<Section>
					<SectionHeader>
						<SectionHeaderTitle animatedText="Done reading?" />
						<SectionHeaderSubtitle>See related work</SectionHeaderSubtitle>
					</SectionHeader>
					<div className="relative my-16 grid grid-cols-4 gap-x-4 gap-y-16 md:grid-cols-8 lg:grid-cols-12 lg:gap-x-6">
						{relatedWorks.map((work) => {
							return (
								<div key={work.id} className="col-span-4">
									<ArticleCard href={getWorkPath(work)} title={work.title}>
										<ArticleCardImage
											src={work.heroImg}
											category={work.category}
										/>
										<ArticleCardContent>
											<ArticleCardCategory value={work.category} />
											<ArticleCardTitle>{work.title}</ArticleCardTitle>
											<ArticleCardDescription>
												{work.seo?.description}
											</ArticleCardDescription>
										</ArticleCardContent>
									</ArticleCard>
								</div>
							)
						})}
					</div>
				</Section>
			) : null}
		</article>
	)
}

export { WorkContent }
