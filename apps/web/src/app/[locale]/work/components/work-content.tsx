import { Button, H1, Paragraph } from '@nerdfish/ui'
import { cx } from '@nerdfish/utils'
import {
	ArticleCard,
	ArticleCardCategory,
	ArticleCardContent,
	ArticleCardImage,
	ArticleCardTitle,
	CategoryIndicator,
	getCategoryColors,
	Section,
} from '@nerdfish-website/ui/components'
import { ArrowRight } from '@nerdfish-website/ui/icons'
import Image from 'next/image'
import Link from 'next/link'
import * as React from 'react'
import { tinaField } from 'tinacms/dist/react'
import { mapWorkData } from '../api'
import { getWorkPath } from '../utils'
import { BackToWork } from './misc'
import { Blocks, PortableText, type WorkQueryQuery } from '~/app/cms'
import {
	SectionHeader,
	SectionHeaderSubtitle,
	SectionHeaderTitle,
} from '~/app/common'

const prose = 'prose dark:prose-invert md:prose-lg lg:prose-xl max-w-4xl'

function WorkContent({ data }: { data: WorkQueryQuery }) {
	const { title, date, heroImg, category, body, url, excerpt, blocks } =
		data.work

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
			.slice(0, 2)
	}, [allWorks, category, date, title])

	return (
		<div>
			<Section asChild className="max-w-4xl">
				<article>
					<div className="mb-lg">
						<BackToWork />
					</div>
					<header className={cx('mb-xl flex max-w-4xl flex-col', prose)}>
						<H1
							variant="primary"
							data-tina-field={tinaField(data.work, 'title')}
							className="!m-0 w-auto"
						>
							{title}
						</H1>
						<div className="mt-xs mb-xl relative">
							<CategoryIndicator category={category} inline />
						</div>
					</header>
					{url ? (
						<div className="mb-md">
							<Button variant="secondary" asChild>
								<Link className="group no-underline" href={url} target="_blank">
									Visit website
									<span className={getCategoryColors(category)}>
										<ArrowRight
											className={cx(
												'group-hover:translate-x-xs ml-sm group-hover:text-primary size-4 text-current transition-all',
											)}
										/>
									</span>
								</Link>
							</Button>
						</div>
					) : null}
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

					{excerpt ? (
						<Paragraph
							className="mb-xl text-xl font-bold"
							data-tina-field={tinaField(data.work, 'excerpt')}
						>
							{excerpt}
						</Paragraph>
					) : null}

					{body ? (
						<div className={prose}>
							<PortableText
								data-tina-field={tinaField(data.work, 'body')}
								content={body}
							/>
						</div>
					) : null}

					<Blocks items={blocks} />
				</article>
			</Section>

			{relatedWorks.length > 0 ? (
				<Section>
					<SectionHeader>
						<SectionHeaderTitle>Done reading?</SectionHeaderTitle>
						<SectionHeaderSubtitle>See related work</SectionHeaderSubtitle>
					</SectionHeader>
					<div className="relative my-16 grid grid-cols-4 gap-x-4 gap-y-16 md:grid-cols-8 lg:gap-x-6">
						{relatedWorks.map((work) => {
							return (
								<div key={work.id} className="col-span-4">
									<ArticleCard href={getWorkPath(work)} title={work.title}>
										<ArticleCardImage
											src={work.heroImg}
											category={work.category}
										/>
										<ArticleCardContent>
											<ArticleCardCategory>{work.category}</ArticleCardCategory>
											<ArticleCardTitle>{work.title}</ArticleCardTitle>
										</ArticleCardContent>
									</ArticleCard>
								</div>
							)
						})}
					</div>
				</Section>
			) : null}
		</div>
	)
}

export { WorkContent }
