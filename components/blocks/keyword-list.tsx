import * as React from 'react'
import {Container, Grid, H1, Section} from '@daren/ui-components'

import type {Block} from '../../lib/types/cms'

const KeywordList = ({
  parentField,
  title,
  keywords,
}: Block & {
  title?: string
  keywords?: string[]
}) => {
  return (
    <Section>
      <Grid>
        <Container size="full" className="py-32">
          <div className="flex flex-col space-y-8 lg:flex-row lg:justify-between lg:space-y-0 lg:space-x-16">
            <div className="w-full max-w-sm xl:max-w-lg">
              <H1
                data-tinafield={`${parentField}.title`}
                as="h2"
                className="w-full font-bold "
              >
                {title}
              </H1>
            </div>
            <div className="grid w-full grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
              {keywords?.map(item => (
                <span
                  data-tinafields={`${parentField}.keywords.{i}.item`}
                  key={item}
                  className="block text-lg text-primary"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </Container>
      </Grid>
    </Section>
  )
}

export {KeywordList}
