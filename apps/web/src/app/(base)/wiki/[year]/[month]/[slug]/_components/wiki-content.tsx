import * as React from 'react'
import {DateFormatter} from '@nerdfish-website/ui/components/date-formatter'
import {Container, Grid, H1, H6, Section} from '@nerdfish/ui'
import {tinaField} from 'tinacms/dist/react'

import {PortableText} from '~/components/portable-text'
import {WikiQueryQuery} from '~/tina/__generated__/types'

import {BackToWiki} from './misc'

function WikiContent({data}: {data: WikiQueryQuery}) {
  const {title, date, body} = data.wiki

  return (
    <>
      <Section>
        <Grid className="mb-14 mt-24 lg:mb-24">
          <div className="col-span-full flex justify-between lg:col-span-8 lg:col-start-3">
            <BackToWiki />
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
          className="prose md:prose-lg lg:prose-xl dark:prose-invert"
          data-tina-field={tinaField(data.wiki, 'body')}
        >
          {body ? <PortableText content={body} /> : null}
        </Grid>
      </div>
    </>
  )
}

export {WikiContent}
