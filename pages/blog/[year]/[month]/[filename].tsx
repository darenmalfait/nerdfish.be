import { Container, Grid, H2, H6, Section } from '@daren/ui-components'
import { padStart } from 'lodash'
import type { GetStaticPropsContext } from 'next'
import { useTina } from 'tinacms/dist/react'

import type { BlogPostQueryQuery } from '../../../../.tina/__generated__/types'
import { BackLink } from '../../../../components/common/arrow-link'
import { DateFormatter } from '../../../../components/common/date-formatter'
import { Image } from '../../../../components/common/image'
import { PortableText } from '../../../../components/common/portable-text'
import { Seo } from '../../../../components/common/seo'
import { Layout } from '../../../../components/layout/layout'
import { useGlobal } from '../../../../context/global-provider'
import { getBlogPost, getBlogPosts } from '../../../../lib/services/api'
import type { AsyncReturnType } from '../../../../lib/types/misc'
import {
  buildSrc,
  buildSrcSet,
  getLowQualityUrlFor,
} from '../../../../lib/utils/cloudinary'

function Content({ blog }: BlogPostQueryQuery) {
  const { paths } = useGlobal()
  const { title, date, _body, heroImg } = blog

  return (
    <>
      <Section>
        <Grid className="mt-24 mb-14 lg:mb-24">
          <div className="flex col-span-full justify-between lg:col-span-8 lg:col-start-3">
            <BackLink href={paths?.blog || ''}>All blog posts</BackLink>
          </div>
        </Grid>

        <Grid as="header" className="mb-12">
          <Container>
            <H2 data-tinafield="title">{title}</H2>
            {date && (
              <H6
                data-tinafield="date"
                as="p"
                variant="secondary"
                className="mt-2"
              >
                <DateFormatter dateString={date} format="dd MMMM yyyy" />
              </H6>
            )}
          </Container>
        </Grid>

        <Grid className="mb-12">
          <Container size="medium" data-tinafield="image">
            {heroImg && (
              <Image
                placeholder={getLowQualityUrlFor(heroImg)}
                srcSet={buildSrcSet(heroImg)}
                src={buildSrc(heroImg)}
                alt={title}
              />
            )}
          </Container>
        </Grid>
      </Section>
      <Section>
        <Grid className="prose dark:prose-invert" data-tinafield="_body">
          {_body && <PortableText content={_body} />}
        </Grid>
      </Section>
    </>
  )
}

// Use the props returned by get static props
export default function BlogPostPage(
  props: AsyncReturnType<typeof getStaticProps>['props'],
) {
  const { data } = useTina(props)

  return (
    <Layout globalData={data.global}>
      <Seo
        title={data.blog.seo?.title || data.blog.title || 'Untitled'}
        url={props.params?.filename || '/'}
        description={data.blog.seo?.description || ''}
        canonical={data.blog.seo?.canonical}
      />
      <Content {...data} />
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
    paths: ((await getBlogPosts()) || []).map(({ date, _sys }) => {
      const d = new Date(date || '')

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
