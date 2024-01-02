import * as React from 'react'
import {DateFormatter} from '@nerdfish-website/ui/components/date-formatter'
import {Image} from '@nerdfish-website/ui/components/image'
import {Container, Grid, H1, H6, Section} from '@nerdfish/ui'
import {tinaField} from 'tinacms/dist/react'

import {ArticleCard} from '~/components/article-card'
import {Header} from '~/components/header'
import {PortableText} from '~/components/portable-text'
import {mapBlogData} from '~/lib/api/cms'
import {
  buildSrc,
  buildSrcSet,
  getLowQualityUrlFor,
} from '~/lib/utils/cloudinary'
import {BlogPostQueryQuery} from '~/tina/__generated__/types'

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
      <Section>
        <Grid className="mb-14 mt-24 lg:mb-24">
          <div className="col-span-full flex justify-between lg:col-span-8 lg:col-start-3">
            <BackToBlog />
          </div>
        </Grid>

        <Grid as="header" className="mb-12 mt-6">
          <Container size="medium" className="space-y-2">
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
          </Container>
        </Grid>

        <Grid className="mb-12">
          <Container
            size="medium"
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
          </Container>
        </Grid>
      </Section>
      <Section>
        <Grid
          className="prose md:prose-lg lg:prose-xl dark:prose-invert"
          data-tina-field={tinaField(data.blog, 'body')}
        >
          {body ? <PortableText content={body} /> : null}
        </Grid>
      </Section>
      {relatedPosts.length > 0 ? (
        <>
          <Section className="mt-24">
            <Header
              title="Done reading?"
              subTitle="Read more related articles"
            />
          </Section>
          <Section>
            <Grid className="mb-32 mt-16 gap-y-16">
              {relatedPosts.map(relatedBlog => {
                return (
                  <div key={relatedBlog.id} className="col-span-4">
                    <ArticleCard {...relatedBlog} id={relatedBlog.id} />
                  </div>
                )
              })}
            </Grid>
          </Section>
        </>
      ) : null}
    </>
  )
}

export {BlogContent}
