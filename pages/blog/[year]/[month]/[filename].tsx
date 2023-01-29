import * as React from 'react'
import type {GetStaticPropsContext} from 'next'
import {Container, Grid, H1, H6, Section} from '@daren/ui-components'
import {BlockDataProvider, useBlockData} from 'context/block-data-provider'
import {padStart} from 'lodash'
import {useTina} from 'tinacms/dist/react'

import {BackLink} from '../../../../components/common/arrow-link'
import {ArticleCard} from '../../../../components/common/article-card'
import {DateFormatter} from '../../../../components/common/date-formatter'
import {Image} from '../../../../components/common/image'
import {PortableText} from '../../../../components/common/portable-text'
import {Seo} from '../../../../components/common/seo'
import {Header} from '../../../../components/layout/header'
import {Layout} from '../../../../components/layout/layout'
import {useGlobal} from '../../../../context/global-provider'
import {
  getBlogPost,
  getBlogPosts,
  mapBlogData,
} from '../../../../lib/services/api'
import type {AsyncReturnType} from '../../../../lib/types/misc'
import {
  buildSrc,
  buildSrcSet,
  getLowQualityUrlFor,
} from '../../../../lib/utils/cloudinary'
import {getFileNameFromUrl} from '../../../../lib/utils/social'

function Content({
  blog,
}: AsyncReturnType<typeof getStaticProps>['props']['data']) {
  const {paths} = useGlobal()
  const {blog: allPosts} = useBlockData()
  const {title, date, body, heroImg} = blog

  const relatedPosts = React.useMemo(() => {
    return allPosts
      .filter(
        post =>
          post.title !== blog.title &&
          post.date !== blog.date &&
          post.tags?.some(tag => blog.tags?.includes(tag)),
      )
      .slice(0, 3)
  }, [allPosts, blog.date, blog.tags, blog.title])

  return (
    <>
      <Section>
        <Grid className="mt-24 mb-14 lg:mb-24">
          <div className="col-span-full flex justify-between lg:col-span-8 lg:col-start-3">
            <BackLink href={paths?.blog ?? ''}>All blog posts</BackLink>
          </div>
        </Grid>

        <Grid as="header" className="mb-12">
          <Container className="space-y-2">
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
        <Grid className="prose dark:prose-invert" data-tinafield="body">
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

// Use the props returned by get static props
export default function BlogPostPage(
  props: AsyncReturnType<typeof getStaticProps>['props'],
) {
  const {data} = useTina(props)

  const {blogs} = mapBlogData(data)

  return (
    <Layout globalData={data.global}>
      <Seo
        title={data.blog.seo?.title ?? (data.blog.title || 'Untitled')}
        url={props.params?.filename ?? '/'}
        description={data.blog.seo?.description ?? ''}
        canonical={data.blog.seo?.canonical}
        subImage={getFileNameFromUrl(data.blog.heroImg)}
        cardType={data.blog.seo?.cardType}
      />
      <BlockDataProvider blog={blogs}>
        <Content {...mapBlogData(data)} />
      </BlockDataProvider>
    </Layout>
  )
}

export const getStaticProps = async ({
  params,
}: GetStaticPropsContext<{
  filename?: string
  year?: string
  month?: string
}>) => {
  let path = `${params?.filename}.mdx`

  if (params?.year && params.month) {
    path = `${params.year}/${params.month}/${path}`
  }

  return {
    props: {
      ...(await getBlogPost(path)),
      params,
    },
  }
}

export const getStaticPaths = async () => {
  return {
    paths: ((await getBlogPosts()) ?? []).map(({date, _sys}) => {
      const d = new Date(date ?? '')

      return {
        params: {
          year: d.getFullYear().toString(),
          month: padStart((d.getMonth() + 1).toString(), 2, '0'),
          filename: _sys?.filename,
        },
      }
    }),
    fallback: 'blocking',
  }
}
