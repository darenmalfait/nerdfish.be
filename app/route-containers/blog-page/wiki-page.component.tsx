import { Grid, H2, H6 } from '@daren/ui-components'
import { useLoaderData } from '@remix-run/react'
import formatDate from 'date-fns/format'
import * as React from 'react'
import { useTranslation } from 'react-i18next'

import type { LoaderType } from './blog-page.server'

import notFoundImage from '~/assets/images/404.png'
import { BackLink } from '~/components/buttons'
import { PortableText, FourOhFour } from '~/components/common'
import { Container, Section } from '~/components/layout'
import { Preview } from '~/components/utils/preview'
import { blogMeta } from '~/lib/utils/seo'

export const meta = blogMeta

export function CatchBoundary() {
  return <FourOhFour image={notFoundImage} />
}

export default function BlogPage() {
  const { i18n } = useTranslation()
  const {
    data: initialData,
    preview,
    query,
    params,
  } = useLoaderData<LoaderType>()

  const [data, setData] = React.useState(initialData)

  // on page change we need to update the data
  React.useEffect(() => {
    setData(initialData)
  }, [initialData])

  const { body, title, publishedAt } = data

  return (
    <>
      {preview && (
        <Preview data={data} setData={setData} query={query} params={params} />
      )}
      <main>
        <Section>
          <Grid className="mt-24 mb-14 lg:mb-24">
            <div className="flex col-span-full justify-between lg:col-span-8 lg:col-start-3">
              <BackLink href={`/${i18n.language}/wiki/`}>All wiki</BackLink>
            </div>
          </Grid>

          <Grid as="header" className="mb-12">
            <Container>
              <H2>{title}</H2>
              {publishedAt && (
                <H6 as="p" variant="secondary" className="mt-2">
                  {formatDate(new Date(publishedAt), 'dd MMMM yyyy')}
                </H6>
              )}
            </Container>
          </Grid>
        </Section>
        <Section>
          <Grid className="prose">
            {body && <PortableText blocks={body} />}
          </Grid>
        </Section>
      </main>
    </>
  )
}
