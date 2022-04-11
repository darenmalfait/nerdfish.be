import { Grid, H2, H6 } from '@daren/ui-components'
import formatDate from 'date-fns/format'
import * as React from 'react'
import { useTranslation } from 'react-i18next'
import { useLoaderData } from 'remix'

import type { LoaderData } from './blog-page.server'

import notFoundImage from '~/assets/images/404.png'
import { BackLink } from '~/components/buttons'
import { PortableText, FourOhFour } from '~/components/common'
import { OptimizedImage } from '~/components/elements'
import { Container, Section } from '~/components/layout'
import { Preview } from '~/components/utils/preview'
import { getLowQualityUrlFor } from '~/lib/api/sanity'
import { getResponsiveImageSizes } from '~/lib/utils/image'
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
  } = useLoaderData<LoaderData>()

  const [data, setData] = React.useState(initialData)

  // on page change we need to update the data
  React.useEffect(() => {
    setData(initialData)
  }, [initialData])

  const { body, title, publishedAt, image } = data

  return (
    <>
      {preview && (
        <Preview data={data} setData={setData} query={query} params={params} />
      )}
      <main>
        <Section>
          <Grid className="mt-24 mb-14 lg:mb-24">
            <div className="flex col-span-full justify-between lg:col-span-8 lg:col-start-3">
              <BackLink href={`/${i18n.language}/blog/`}>All posts</BackLink>
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

          <Grid className="mb-12">
            <Container size="medium">
              {image && (
                <OptimizedImage
                  {...image}
                  blurDataUrl={getLowQualityUrlFor(image)}
                  responsive={getResponsiveImageSizes('full')}
                  alt={title}
                />
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
