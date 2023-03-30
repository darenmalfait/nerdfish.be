'use client'

import * as React from 'react'
import {Container, Grid, H1, H6, Section} from '@nerdfish/ui'
import {useTina} from 'tinacms/dist/react'

import {BackLink} from '~/components/common/arrow-link'
import {ArticleCard} from '~/components/common/article-card'
import {DateFormatter} from '~/components/common/date-formatter'
import {Image} from '~/components/common/image'
import {PortableText} from '~/components/common/portable-text'
import {Header} from '~/components/layout/header'
import {Layout} from '~/components/layout/layout'
import {BlockDataProvider, useBlockData} from '~/context/block-data-provider'
import {useGlobal} from '~/context/global-provider'
import {mapBlogData} from '~/lib/services/api'
import {
  buildSrc,
  buildSrcSet,
  getLowQualityUrlFor,
} from '~/lib/utils/cloudinary'
import {
  type Blog,
  type BlogPostQueryQuery,
  type BlogQueryVariables,
} from '~/tina/__generated__/types'

function Content({title, date, tags, heroImg, body}: Partial<Blog>) {
  const {paths} = useGlobal()
  const {blogs: allPosts} = useBlockData()

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
        <Grid className="mt-24 mb-14 lg:mb-24">
          <div className="col-span-full flex justify-between lg:col-span-8 lg:col-start-3">
            <BackLink href={paths?.blog ?? ''}>All blog posts</BackLink>
          </div>
        </Grid>

        <Grid as="header" className="mb-12 mt-6">
          <Container size="medium" className="space-y-2">
            <H1 data-tinafield="title">{title}</H1>
            {date ? (
              <H6 data-tinafield="date" as="p" variant="secondary">
                <DateFormatter dateString={date} format="dd MMMM yyyy" />
              </H6>
            ) : null}
          </Container>
        </Grid>

        <Grid className="mb-12">
          <Container size="medium" data-tinafield="image">
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
          className="prose dark:prose-invert md:prose-lg lg:prose-xl"
          data-tinafield="body"
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
            <Grid className="mt-16 mb-32 gap-y-16">
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

function BlogPage(props: {
  data: BlogPostQueryQuery
  query: string
  variables: BlogQueryVariables
}) {
  const {data} = useTina<BlogPostQueryQuery>({
    query: props.query,
    variables: props.variables,
    data: props.data,
  })

  return (
    <Layout globalData={data.global}>
      <BlockDataProvider {...mapBlogData(data)}>
        <Content {...data.blog} />
      </BlockDataProvider>
    </Layout>
  )
}

export {BlogPage}
