import {Container} from '@daren/ui-components'
import type {Language} from 'prism-react-renderer'
import * as React from 'react'

import {CodeBlock} from '../code-block/code-block'

function PortableCode({lang, value}: {lang?: Language; value?: string}) {
  return (
    <Container size="default">
      <CodeBlock
        code={value}
        className="!rounded-xl"
        language={lang}
        showLanguage={false}
        showLineNumbers={true}
      />
    </Container>
  )
}

export {PortableCode}
