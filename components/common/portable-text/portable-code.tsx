import * as React from 'react'
import {Container} from '@nerdfish/ui'
import {type Language} from 'prism-react-renderer'

import {CodeBlock} from '../code-block/code-block'

function PortableCode({lang, value}: {lang?: Language; value?: string}) {
  return (
    <Container size="default">
      <CodeBlock
        code={value}
        language={lang}
        showLanguage={false}
        showLineNumbers={true}
      />
    </Container>
  )
}

export {PortableCode}
