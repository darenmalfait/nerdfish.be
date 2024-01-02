import * as React from 'react'
import {Code} from '@nerdfish-website/ui/components/code'
import {Container} from '@nerdfish/ui'

function PortableCode({lang, value}: {lang?: string; value?: string}) {
  if (!value) return null

  return (
    <Container size="default">
      <Code code={value} lang={lang} />
    </Container>
  )
}

export {PortableCode}
