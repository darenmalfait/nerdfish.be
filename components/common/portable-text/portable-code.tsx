import * as React from 'react'
import {Container} from '@nerdfish/ui'
import {Lang} from 'shiki'

import {Code} from '../code'

function PortableCode({lang, value}: {lang?: Lang; value?: string}) {
  if (!value) return null

  return (
    <Container size="default">
      {/* https://github.com/vercel/next.js/issues/42292 */}
      {/* @ts-expect-error Server Component */}
      <Code code={value} lang={lang} />
    </Container>
  )
}

export {PortableCode}
