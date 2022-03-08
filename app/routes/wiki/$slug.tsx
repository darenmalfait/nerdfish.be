import { Grid } from '@daren/ui-components'
import * as React from 'react'
import { json, LoaderFunction, MetaFunction, useLoaderData } from 'remix'

import { BackLink } from '~/components/buttons'
import { Section } from '~/components/layout'

import { getWikiPage, WikiPage } from '~/lib/api'

type LoaderData = WikiPage

export const loader: LoaderFunction = async ({ params }) => {
  if (!params.slug) {
    throw new Error('No slug provided')
  }

  const wikiPage = await getWikiPage(params.slug)

  return json<LoaderData>(wikiPage)
}

export const meta: MetaFunction = ({ data }) => {
  const { title, description } = data

  return {
    title,
    description,
  }
}

export default function WikiDetailPage() {
  const { html } = useLoaderData<LoaderData>()
  return (
    <main>
      <main>
        <Section>
          <Grid className="mt-24">
            <div className="flex col-span-full justify-between lg:col-span-8 lg:col-start-3">
              <BackLink href="/wiki">All wiki pages</BackLink>
            </div>
          </Grid>
        </Section>
        <Section>
          <Grid className="prose dark:prose-invert">
            <div dangerouslySetInnerHTML={{ __html: html || '' }} />
          </Grid>
        </Section>
      </main>
    </main>
  )
}
