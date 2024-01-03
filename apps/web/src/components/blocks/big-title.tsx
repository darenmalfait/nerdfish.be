import * as React from 'react'
import {Container, DoubleLabelLink, Grid, Section} from '@nerdfish/ui'
import {tinaField} from 'tinacms/dist/react'

import {Link} from '~/components/link'
import {type Block} from '~/lib/types/cms'

const BigTitle = (
  data: Block & {
    title?: string
    action?: {
      title?: string
      label?: string
      href?: string
    }
  },
) => {
  const {title, action} = data

  return (
    <Section>
      <Grid className="my-8 lg:my-16">
        <Container size="full" className="space-y-6">
          {action?.title ? (
            <DoubleLabelLink
              as={Link}
              href={action.href ?? '/'}
              description={action.label ?? ''}
              data-tina-field={tinaField(action)}
              className="cursor-pointer"
            >
              {action.title}
            </DoubleLabelLink>
          ) : null}
          <h1
            data-tina-field={tinaField(data, 'title')}
            className="font-sans text-6xl font-black uppercase leading-none text-transparent text-primary sm:text-[11.6250vw] 2xl:text-[12rem]"
          >
            {title}
          </h1>
        </Container>
      </Grid>
    </Section>
  )
}

export {BigTitle}
