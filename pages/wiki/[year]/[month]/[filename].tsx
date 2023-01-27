import type {GetStaticPropsContext} from 'next'
import {Container, Grid, H2, H6, Section} from '@daren/ui-components'
import {padStart} from 'lodash'
import {useTina} from 'tinacms/dist/react'

import type {WikiQueryQuery} from '../../../../.tina/__generated__/types'
import {BackLink} from '../../../../components/common/arrow-link'
import {DateFormatter} from '../../../../components/common/date-formatter'
import {PortableText} from '../../../../components/common/portable-text'
import {Seo} from '../../../../components/common/seo'
import {Layout} from '../../../../components/layout/layout'
import {useGlobal} from '../../../../context/global-provider'
import {getWikiPost, getWikiPosts} from '../../../../lib/services/api'
import type {AsyncReturnType} from '../../../../lib/types/misc'
import {getFileNameFromUrl} from '../../../../lib/utils/social'

function Content({wiki}: WikiQueryQuery) {
  const {paths} = useGlobal()

  const {title, date, body} = wiki

  return (
    <>
      <Section>
        <Grid className="mt-24 mb-14 lg:mb-24">
          <div className="col-span-full flex justify-between lg:col-span-8 lg:col-start-3">
            <BackLink href={paths?.wiki ?? ''}>All wiki</BackLink>
          </div>
        </Grid>

        <Grid as="header" className="mb-12">
          <Container className="space-y-2">
            <H2 data-tinafield="title">{title}</H2>
            {date ? (
              <H6 data-tinafield="date" as="p" variant="secondary">
                <DateFormatter dateString={date} format="dd MMMM yyyy" />
              </H6>
            ) : null}
          </Container>
        </Grid>
      </Section>
      <Section>
        <Grid className="prose dark:prose-invert" data-tinafield="body">
          {body ? <PortableText content={body} /> : null}
        </Grid>
      </Section>
    </>
  )
}

export default function WikiPage(
  props: AsyncReturnType<typeof getStaticProps>['props'],
) {
  const {data} = useTina(props)

  return (
    <Layout globalData={data.global}>
      <Seo
        image={data.wiki.seo?.seoImg}
        subImage={
          data.wiki.seo?.partialSeoImage
            ? getFileNameFromUrl(data.wiki.seo.partialSeoImage)
            : undefined
        }
        title={data.wiki.seo?.title ?? (data.wiki.title || 'Untitled')}
        url={props.params?.filename ?? '/'}
        description={data.wiki.seo?.description ?? ''}
        canonical={data.wiki.seo?.canonical}
        cardType={data.wiki.seo?.cardType}
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
      ...(await getWikiPost(path)),
      params,
    },
  }
}

export const getStaticPaths = async () => {
  return {
    paths: ((await getWikiPosts()) ?? []).map(({date, _sys}) => {
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
