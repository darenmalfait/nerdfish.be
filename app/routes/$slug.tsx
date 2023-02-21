import {LoaderArgs, MetaFunction, json} from '@remix-run/node'
import {useLoaderData} from '@remix-run/react'
import {Blog, Product, Wiki} from '_tina/__generated__/types'
import {DynamicLinksFunction} from 'remix-utils'
import {useTina} from 'tinacms/dist/react'

import {Blocks} from '~/components/blocks-renderer'
import {getMetaTags} from '~/components/common/seo'
import {BlockDataProvider} from '~/context/block-data-provider'
import {getPageData} from '~/lib/services/content.server'
import {getDomainUrl, getUrl} from '~/lib/utils/misc'
import {getFileNameFromUrl} from '~/lib/utils/social'

export async function loader({params, request}: LoaderArgs) {
  const {data, query, variables} = await getPageData(params.slug)
  const domainUrl = getDomainUrl(request)
  const url = getUrl(request)

  return json({
    globalData: {
      products: data.productConnection.edges?.map(
        edge => edge?.node,
      ) as Product[],
      wiki: data.wikiConnection.edges?.map(edge => edge?.node) as Wiki[],
      blog: data.blogConnection.edges?.map(edge => edge?.node) as Blog[],
    },
    page: data,
    query,
    variables,
    seo: {
      title: data.page.seo?.title ?? data.page.title,
      description: data.page.seo?.description ?? data.page.title,
      cardType: data.page.seo?.cardType,
      image: data.page.seo?.seoImg,
      subImage: data.page.seo?.partialSeoImage
        ? getFileNameFromUrl(data.page.seo.partialSeoImage)
        : undefined,
      basePath: domainUrl,
      url,
      canonical: data.page.seo?.canonical ?? url,
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

export default function BasicPage() {
  const loaderData = useLoaderData<typeof loader>()

  const {data} = useTina({
    query: loaderData.query,
    variables: loaderData.variables,
    data: loaderData.page,
  })

  return (
    <BlockDataProvider {...loaderData.globalData}>
      <Blocks items={data.page.blocks as any} />
    </BlockDataProvider>
  )
}
