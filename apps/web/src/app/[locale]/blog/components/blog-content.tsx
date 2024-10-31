import { H1 } from '@nerdfish/ui'
import { cx } from '@nerdfish/utils'
import {
	ArticleCard,
	ArticleCardCategory,
	ArticleCardContent,
	ArticleCardDescription,
	ArticleCardImage,
	ArticleCardTitle,
	DateFormatter,
	Section,
} from '@nerdfish-website/ui/components'
import Image from 'next/image'
import * as React from 'react'
import { tinaField } from 'tinacms/dist/react'
import { mapBlogData } from '../api'
import { getBlogPath } from '../utils'
import { BackToBlog } from './misc'
import { PortableText, type BlogPostQueryQuery } from '~/app/cms'
import {
	SectionHeader,
	ReadingProgress,
	SectionHeaderTitle,
	SectionHeaderSubtitle,
} from '~/app/common'
import { AnimatedText } from '~/app/common/components/animated-text'

const prose = 'prose dark:prose-invert md:prose-lg lg:prose-xl max-w-4xl'

function BlogContent({ data }: { data: BlogPostQueryQuery }) {
	const { title, date, tags, heroImg, body } = data.blog

	const blockData = { ...mapBlogData(data) }
	const { blogs: allPosts } = blockData

	const relatedPosts = React.useMemo(() => {
		return allPosts
			.filter(
				(post) =>
					post.title !== title &&
					post.date !== date &&
					post.tags?.some((tag) => tags?.includes(tag)),
			)
			.slice(0, 3)
	}, [allPosts, date, tags, title])

	return (
		<article>
			<ReadingProgress offset={1200} />
			<Section className="max-w-4xl">
				<div className="mb-lg">
					<BackToBlog />
				</div>
				<header className={cx('flex max-w-4xl flex-col', prose)}>
					{date ? (
						<span
							className="text-muted mb-xs text-lg"
							data-tina-field={tinaField(data.blog, 'date')}
						>
							Published{' '}
							<DateFormatter dateString={date} format="dd MMMM yyyy" />
						</span>
					) : null}
					<H1
						data-tina-field={tinaField(data.blog, 'title')}
						className="!mb-lg w-auto"
					>
						<AnimatedText value={title} letterClassName="hover:text-primary" />
					</H1>
				</header>
				{heroImg ? (
					<div className={cx(prose, 'mb-xl mx-auto')}>
						<div
							className="rounded-semi overflow-hidden"
							data-tina-field={tinaField(data.blog, 'heroImg')}
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
							data-tina-field={tinaField(data.blog, 'body')}
							content={body}
						/>
					</div>
				) : null}
			</Section>

			{relatedPosts.length > 0 ? (
				<Section>
					<SectionHeader>
						<SectionHeaderTitle animatedText="Done reading?" />
						<SectionHeaderSubtitle>
							Read more related articles
						</SectionHeaderSubtitle>
					</SectionHeader>
					<ul className="gap-x-lg gap-y-xl relative grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12">
						{relatedPosts.map((relatedBlog) => {
							return (
								<li key={relatedBlog.id} className="col-span-4">
									<ArticleCard
										href={getBlogPath(relatedBlog)}
										title={relatedBlog.title}
									>
										<ArticleCardImage
											src={relatedBlog.heroImg}
											category={relatedBlog.category}
										/>
										<ArticleCardContent>
											<ArticleCardCategory>
												{relatedBlog.category}
											</ArticleCardCategory>
											<ArticleCardTitle>{relatedBlog.title}</ArticleCardTitle>
											<ArticleCardDescription>
												{relatedBlog.seo?.description}
											</ArticleCardDescription>
										</ArticleCardContent>
									</ArticleCard>
								</li>
							)
						})}
					</ul>
				</Section>
			) : null}
		</article>
	)
}

export { BlogContent }
