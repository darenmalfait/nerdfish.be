import {Container, Grid, H1, H6, Section} from '@daren/ui-components'
import {LoaderArgs, MetaFunction, SerializeFrom, json} from '@remix-run/node'
import {useLoaderData} from '@remix-run/react'
import {Blog} from '_tina/__generated__/types'
import {DynamicLinksFunction} from 'remix-utils'
import {useTina} from 'tinacms/dist/react'

import {BackLink} from '~/components/common/arrow-link'
import {ArticleCard} from '~/components/common/article-card'
import {DateFormatter} from '~/components/common/date-formatter'
import {Image} from '~/components/common/image'
import {PortableText} from '~/components/common/portable-text'
import {getMetaTags} from '~/components/common/seo'
import {Header} from '~/components/layout/header'
import {BlockDataProvider} from '~/context/block-data-provider'
import {useGlobal} from '~/context/global-provider'
import {getBlogData} from '~/lib/services/content.server'
import {
  buildSrc,
  buildSrcSet,
  getLowQualityUrlFor,
} from '~/lib/utils/cloudinary'
import {getDomainUrl, getUrl} from '~/lib/utils/misc'
import {getFileNameFromUrl} from '~/lib/utils/social'

export async function loader({params, request}: LoaderArgs) {
  const domainUrl = getDomainUrl(request)
  const url = getUrl(request)

  let path = `${params.slug}.mdx`

  if (params.year && params.month) {
    path = `${params.year}/${params.month}/${path}`
  }

  const {data, query, variables, relatedPosts} = await getBlogData(path)

  return json({
    relatedPosts,
    blog: data,
    query,
    variables,
    seo: {
      title: data.blog.seo?.title ?? data.blog.title,
      description: data.blog.seo?.description ?? data.blog.title,
      cardType: data.blog.seo?.cardType,
      image: data.blog.seo?.seoImg,
      subImage: data.blog.seo?.partialSeoImage
        ? getFileNameFromUrl(data.blog.seo.partialSeoImage)
        : undefined,
      basePath: domainUrl,
      url,
      canonical: data.blog.seo?.canonical ?? url,
    },
  })
}

export const meta: MetaFunction<typeof loader> = ({data}) => {
  return getMetaTags(data.seo)
}

const dynamicLinks: DynamicLinksFunction = ({data}) => {
  return [
    {
      rel: 'canonical',
      href: data.seo.canonical,
    },
  ]
}

export const handle = {dynamicLinks}

function Content({
  relatedPosts,
  blog,
}: {
  relatedPosts: SerializeFrom<Blog>[]
  blog: Partial<SerializeFrom<Blog>>
}) {
  const {paths} = useGlobal()
  const {title, date, body, heroImg} = blog

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

export default function BlogPage() {
  const loaderData = useLoaderData<typeof loader>()

  const {data} = useTina({
    query: loaderData.query,
    variables: loaderData.variables,
    data: loaderData.blog,
  })

  return (
    <BlockDataProvider blog={loaderData.relatedPosts}>
      <Content relatedPosts={loaderData.relatedPosts} blog={data.blog} />
    </BlockDataProvider>
  )
}
