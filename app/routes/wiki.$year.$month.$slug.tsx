import {Container, Grid, H1, H6, Section} from '@daren/ui-components'
import {LoaderArgs, MetaFunction, SerializeFrom, json} from '@remix-run/node'
import {useLoaderData} from '@remix-run/react'
import {Wiki} from '_tina/__generated__/types'
import {DynamicLinksFunction} from 'remix-utils'
import {useTina} from 'tinacms/dist/react'

import {BackLink} from '~/components/common/arrow-link'
import {DateFormatter} from '~/components/common/date-formatter'
import {PortableText} from '~/components/common/portable-text'
import {getMetaTags} from '~/components/common/seo'
import {BlockDataProvider} from '~/context/block-data-provider'
import {useGlobal} from '~/context/global-provider'
import {getWikiData} from '~/lib/services/content.server'
import {getDomainUrl, getUrl} from '~/lib/utils/misc'
import {getFileNameFromUrl} from '~/lib/utils/social'

export async function loader({params, request}: LoaderArgs) {
  const domainUrl = getDomainUrl(request)
  const url = getUrl(request)

  let path = `${params.slug}.mdx`

  if (params.year && params.month) {
    path = `${params.year}/${params.month}/${path}`
  }

  const {data, query, variables} = await getWikiData(path)

  return json({
    wiki: data,
    query,
    variables,
    seo: {
      title: data.wiki.seo?.title ?? data.wiki.title,
      description: data.wiki.seo?.description ?? data.wiki.title,
      cardType: data.wiki.seo?.cardType,
      image: data.wiki.seo?.seoImg,
      subImage: data.wiki.seo?.partialSeoImage
        ? getFileNameFromUrl(data.wiki.seo.partialSeoImage)
        : undefined,
      basePath: domainUrl,
      url,
      canonical: data.wiki.seo?.canonical ?? url,
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

function Content({wiki}: {wiki: Partial<SerializeFrom<Wiki>>}) {
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
            <H1 data-tinafield="title">{title}</H1>
            {date ? (
              <H6 data-tinafield="date" as="p" variant="secondary">
                <DateFormatter dateString={date} format="dd MMMM yyyy" />
              </H6>
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
    </>
  )
}

export default function WikiPage() {
  const loaderData = useLoaderData<typeof loader>()

  const {data} = useTina({
    query: loaderData.query,
    variables: loaderData.variables,
    data: loaderData.wiki,
  })

  return (
    <BlockDataProvider>
      <Content wiki={data.wiki} />
    </BlockDataProvider>
  )
}
