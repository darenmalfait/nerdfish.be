import * as React from 'react'
import {Container, Grid, H1, H6, Section} from '@nerdfish/ui'
import {tinaField} from 'tinacms/dist/react'

import {BackLink} from '~/components/common/arrow-link'
import {DateFormatter} from '~/components/common/date-formatter'
import {PortableText} from '~/components/common/portable-text'
import {WikiQueryQuery} from '~/tina/__generated__/types'

function WikiContent({
  data,
  wikiPath,
}: {
  data: WikiQueryQuery
  wikiPath?: string | null
}) {
  const {title, date, body} = data.wiki

  return (
    <>
      <Section>
        <Grid className="mb-14 mt-24 lg:mb-24">
          <div className="col-span-full flex justify-between lg:col-span-8 lg:col-start-3">
            <BackLink href={wikiPath ?? ''}>All wiki</BackLink>
          </div>
        </Grid>

        <Grid as="header" className="mb-12 mt-6">
          <Container size="medium" className="space-y-2">
            {title ? (
              <H1 data-tina-field={tinaField(data.wiki, 'title')}>{title}</H1>
            ) : null}
            {date ? (
              <H6
                data-tina-field={tinaField(data.wiki, 'date')}
                as="p"
                variant="secondary"
              >
                <DateFormatter dateString={date} format="dd MMMM yyyy" />
              </H6>
            ) : null}
          </Container>
        </Grid>
      </Section>
      <div>
        <Grid
          className="prose dark:prose-invert md:prose-lg lg:prose-xl"
          data-tina-field={tinaField(data.wiki, 'body')}
        >
          {body ? <PortableText content={body} /> : null}
        </Grid>
      </div>
    </>
  )
}

export {WikiContent}
