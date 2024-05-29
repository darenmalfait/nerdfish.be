import * as React from 'react'
import {DateFormatter} from '@nerdfish-website/ui/components/date-formatter'
import {Image} from '@nerdfish-website/ui/components/image'
import {H1, H6} from '@nerdfish/ui'
import {tinaField} from 'tinacms/dist/react'

import {PortableText, type BlogPostQueryQuery} from '~/app/cms'
import {
  ArticleCard,
  buildSrc,
  buildSrcSet,
  getLowQualityUrlFor,
  Header,
} from '~/app/common'

import {mapBlogData} from '../api'
import {BackToBlog} from './misc'

function BlogContent({data}: {data: BlogPostQueryQuery}) {
  const {title, date, tags, heroImg, body} = data.blog

  const blockData = {...mapBlogData(data)}
  const {blogs: allPosts} = blockData

  const relatedPosts = React.useMemo(() => {
    return allPosts
      .filter(
        post =>
          post.title !== title &&
          post.date !== date &&
          post.tags?.some(tag => tags?.includes(tag)),
      )
      .slice(0, 3)
  }, [allPosts, date, tags, title])

  return (
    <>
      <section>
        <div className="container mx-auto mb-14 mt-24 max-w-4xl px-4 lg:mb-24">
          <BackToBlog />
        </div>

        <header className="container mx-auto mb-12 mt-6 max-w-4xl px-4">
          <H1 data-tina-field={tinaField(data.blog, 'title')}>{title}</H1>
          {date ? (
            <H6
              data-tina-field={tinaField(data.blog, 'date')}
              as="p"
              variant="secondary"
            >
              <DateFormatter dateString={date} format="dd MMMM yyyy" />
            </H6>
          ) : null}
        </header>

        <div
          className="container mx-auto mb-12 max-w-4xl px-4"
          data-tina-field={tinaField(data.blog, 'heroImg')}
        >
          {heroImg ? (
            <Image
              placeholder={getLowQualityUrlFor(heroImg)}
              srcSet={buildSrcSet(heroImg)}
              src={buildSrc(heroImg)}
              alt={title}
            />
          ) : null}
        </div>
      </section>
      <section
        className="prose container mx-auto px-4 dark:prose-invert md:prose-lg lg:prose-xl"
        data-tina-field={tinaField(data.blog, 'body')}
      >
        {body ? <PortableText content={body} /> : null}
      </section>
      {relatedPosts.length > 0 ? (
        <section className="container mx-auto mt-24 px-4">
          <Header title="Done reading?" subTitle="Read more related articles" />
          <div className="relative mb-32 mt-16 grid grid-cols-4 gap-x-4 gap-y-16 md:grid-cols-8 lg:grid-cols-12 lg:gap-x-6">
            {relatedPosts.map(relatedBlog => {
              return (
                <div key={relatedBlog.id} className="col-span-4">
                  <ArticleCard {...relatedBlog} id={relatedBlog.id} />
                </div>
              )
            })}
          </div>
        </section>
      ) : null}
    </>
  )
}

export {BlogContent}
