import type {GetStaticPropsContext} from 'next'
import {useTina} from 'tinacms/dist/react'

import {Blocks} from '../components/blocks-renderer'
import {Seo} from '../components/common/seo'
import {Layout} from '../components/layout/layout'
import {BlockDataProvider} from '../context/block-data-provider'
import {getPage, getPages, mapPageData} from '../lib/services/api'
import type {AsyncReturnType} from '../lib/types/misc'

function Content({
  page,
  wiki,
  blog,
}: AsyncReturnType<typeof getStaticProps>['props']['data']) {
  return (
    <BlockDataProvider wiki={wiki} blog={blog}>
      <Blocks items={page.blocks as any} />
    </BlockDataProvider>
  )
}

export default function Page(
  props: AsyncReturnType<typeof getStaticProps>['props'],
) {
  const {data} = useTina(props)

  return (
    <Layout globalData={data.global}>
      <Seo
        title={data.page.seo?.title ?? (data.page.title || 'Untitled')}
        url={props.params?.filename ?? '/'}
        description={data.page.seo?.description ?? ''}
        canonical={data.page.seo?.canonical}
      />
      <Content {...mapPageData(data)} />
    </Layout>
  )
}

export const getStaticProps = async ({
  params,
}: GetStaticPropsContext<{filename?: string}>) => {
  const path = `${params?.filename ?? 'home'}.md`

  return {
    props: {
      ...(await getPage(path)),
      params,
    },
  }
}

export const getStaticPaths = async () => {
  return {
    paths: ((await getPages()) ?? []).map(page => ({
      params: {filename: page._sys?.filename},
    })),
    fallback: 'blocking',
  }
}
