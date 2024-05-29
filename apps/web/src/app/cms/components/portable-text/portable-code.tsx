import * as React from 'react'
import {Code} from '@nerdfish-website/ui/components/code'

function PortableCode({lang, value}: {lang?: string; value?: string}) {
  if (!value) return null

  return <Code code={value} lang={lang} />
}

export {PortableCode}
