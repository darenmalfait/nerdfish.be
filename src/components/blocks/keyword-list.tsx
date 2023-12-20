import * as React from 'react'
import {Container, Grid, H1, Section} from '@nerdfish/ui'
import {tinaField} from 'tinacms/dist/react'

import {type Block} from '~/lib/types/cms'

const KeywordList = (
  data: Block & {
    title?: string
    keywords?: string[]
  },
) => {
  const {title, keywords} = data

  return (
    <Section>
      <Grid>
        <Container size="full" className="py-32">
          <div className="flex flex-col space-y-8 lg:flex-row lg:justify-between lg:space-x-16 lg:space-y-0">
            <div className="w-full max-w-sm xl:max-w-lg">
              <H1
                data-tina-field={tinaField(data, 'title')}
                as="h2"
                className="w-full font-bold "
              >
                {title}
              </H1>
            </div>
            <div
              data-tina-field={tinaField(data, 'keywords')}
              className="grid w-full grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3"
            >
              {keywords?.map(item => (
                <span key={item} className="block text-lg text-primary">
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
