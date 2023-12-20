import * as React from 'react'
import {Container} from '@nerdfish/ui'

import {Code} from '../code'

function PortableCode({lang, value}: {lang?: string; value?: string}) {
  if (!value) return null

  return (
    <Container size="default">
      <Code code={value} lang={lang} />
    </Container>
  )
}

export {PortableCode}
