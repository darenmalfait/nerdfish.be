'use client'

import * as React from 'react'
import {Container, Grid, H1, H6, Section} from '@nerdfish/ui'
import {useTina} from 'tinacms/dist/react'

import {BackLink} from '~/components/common/arrow-link'
import {DateFormatter} from '~/components/common/date-formatter'
import {PortableText} from '~/components/common/portable-text'
import {Layout} from '~/components/layout/layout'
import {BlockDataProvider} from '~/context/block-data-provider'
import {useGlobal} from '~/context/global-provider'
import {
  type Wiki,
  type WikiQueryQuery,
  type WikiQueryQueryVariables,
} from '~/tina/__generated__/types'

function Content({title, date, body}: Partial<Wiki>) {
  const {paths} = useGlobal()
  return (
    <>
      <Section>
        <Grid className="mb-14 mt-24 lg:mb-24">
          <div className="col-span-full flex justify-between lg:col-span-8 lg:col-start-3">
            <BackLink href={paths?.wiki ?? ''}>All wiki</BackLink>
          </div>
        </Grid>

        <Grid as="header" className="mb-12 mt-6">
          <Container size="medium" className="space-y-2">
            {title ? <H1 data-tina-Efield="title">{title}</H1> : null}
            {date ? (
              <H6 data-tina-Efield="date" as="p" variant="secondary">
                <DateFormatter dateString={date} format="dd MMMM yyyy" />
              </H6>
            ) : null}
          </Container>
        </Grid>
      </Section>
      <div>
        <Grid
          className="prose dark:prose-invert md:prose-lg lg:prose-xl"
          data-tina-Efield="body"
        >
          {body ? <PortableText content={body} /> : null}
        </Grid>
      </div>
    </>
  )
}

function WikiPage(props: {
  data: WikiQueryQuery
  query: string
  variables: WikiQueryQueryVariables
}) {
  const {data} = useTina<WikiQueryQuery>({
    query: props.query,
    variables: props.variables,
    data: props.data,
  })

  return (
    <Layout globalData={data.global}>
      <BlockDataProvider {...data}>
        <Content {...data.wiki} />
      </BlockDataProvider>
    </Layout>
  )
}

export {WikiPage}
