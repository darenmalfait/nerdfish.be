import { H1 } from '@nerdfish/ui'
import { cx } from '@nerdfish/utils'
import { DateFormatter } from '@nerdfish-website/ui/components/date-formatter.tsx'
import Image from 'next/image'
import * as React from 'react'
import { tinaField } from 'tinacms/dist/react'

import { mapBlogData } from '../api'
import { BackToBlog } from './misc'
import { PortableText, type BlogPostQueryQuery } from '~/app/cms'
import {
	ArticleCard,
	BlogPath,
	getDatedSlug,
	Header,
	ReadingProgress,
} from '~/app/common'

const prose = 'prose dark:prose-invert md:prose-lg lg:prose-xl'

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
		<>
			<ReadingProgress offset={1200} />
			<section className="container mx-auto mb-8 mt-24 px-4">
				<div className="flex w-full flex-col gap-8 xl:flex-row">
					<div className="flex-1">
						<BackToBlog />
					</div>
					<div className={cx('flex flex-col', prose)}>
						{date ? (
							<span
								className="text-muted text-base"
								data-tina-field={tinaField(data.blog, 'date')}
							>
								Published{' '}
								<DateFormatter dateString={date} format="dd MMMM yyyy" />
							</span>
						) : null}
						<H1 data-tina-field={tinaField(data.blog, 'title')}>{title}</H1>
					</div>
					<div className="flex-1" />
				</div>
			</section>
			<section className="container mx-auto mb-14 mt-24 px-4">
				<div
					className="container mx-auto mb-12 max-w-4xl px-4"
					data-tina-field={tinaField(data.blog, 'heroImg')}
				>
					{heroImg ? (
						<Image src={heroImg} alt={title} width={900} height={900} />
					) : null}
				</div>
			</section>
			<section
				className={cx('container mx-auto px-4', prose)}
				data-tina-field={tinaField(data.blog, 'body')}
			>
				{body ? <PortableText content={body} /> : null}
			</section>
			{relatedPosts.length > 0 ? (
				<section className="container mx-auto mt-24 px-4">
					<Header title="Done reading?" subtitle="Read more related articles" />
					<div className="relative my-16 grid grid-cols-4 gap-x-4 gap-y-16 md:grid-cols-8 lg:grid-cols-12 lg:gap-x-6">
						{relatedPosts.map((relatedBlog) => {
							return (
								<div key={relatedBlog.id} className="col-span-4">
									<ArticleCard
										href={`/${BlogPath}${getDatedSlug(relatedBlog.date, relatedBlog._sys.filename)}`}
										{...relatedBlog}
										id={relatedBlog.id}
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

export { BlogContent }
