import { H1 } from '@nerdfish/ui'
import { cx } from '@nerdfish/utils'
import { DateFormatter } from '@nerdfish-website/ui/components'
import Image from 'next/image'
import * as React from 'react'
import { tinaField } from 'tinacms/dist/react'
import { mapBlogData } from '../api'
import { getBlogPath } from '../utils'
import { BackToBlog } from './misc'
import { PortableText, type BlogPostQueryQuery } from '~/app/cms'
import {
	ArticleCard,
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
			<section className="container mx-auto mb-8 mt-24 max-w-4xl px-4">
				<div className="mb-6">
					<BackToBlog />
				</div>
				<header className={cx('flex max-w-4xl flex-col', prose)}>
					{date ? (
						<span
							className="text-muted mb-2 text-lg"
							data-tina-field={tinaField(data.blog, 'date')}
						>
							Published{' '}
							<DateFormatter dateString={date} format="dd MMMM yyyy" />
						</span>
					) : null}
					<H1
						data-tina-field={tinaField(data.blog, 'title')}
						className="w-auto"
					>
						<AnimatedText value={title} letterClassName="hover:text-primary" />
					</H1>
				</header>
				{heroImg ? (
					<div className={cx(prose, 'mx-auto my-12')}>
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
			</section>

			<section
				className={cx('container mx-auto px-4', prose)}
				data-tina-field={tinaField(data.blog, 'body')}
			>
				{body ? <PortableText content={body} /> : null}
			</section>
			{relatedPosts.length > 0 ? (
				<section className="container mx-auto mt-24 px-4">
					<SectionHeader>
						<SectionHeaderTitle animatedText="Done reading?" />
						<SectionHeaderSubtitle>
							Read more related articles
						</SectionHeaderSubtitle>
					</SectionHeader>
					<ul className="relative my-16 grid grid-cols-4 gap-x-4 gap-y-16 md:grid-cols-8 lg:grid-cols-12 lg:gap-x-6">
						{relatedPosts.map((relatedBlog) => {
							return (
								<li key={relatedBlog.id} className="col-span-4">
									<ArticleCard
										href={getBlogPath(relatedBlog)}
										{...relatedBlog}
										id={relatedBlog.id}
									/>
								</li>
							)
						})}
					</ul>
				</section>
			) : null}
		</article>
	)
}

export { BlogContent }
