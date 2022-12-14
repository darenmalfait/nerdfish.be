import {Container} from '@daren/ui-components'
import type {Language, PrismTheme} from 'prism-react-renderer'
import * as React from 'react'

import {CodeBlock} from '../code-block/code-block'

import theme from './vscode-theme'

function PortableCode({lang, value}: {lang?: Language; value?: string}) {
  return (
    <Container size="default">
      <CodeBlock
        code={value}
        theme={theme as PrismTheme}
        className="!rounded-xl"
        language={lang}
        showLanguage={false}
        showLineNumbers={true}
      />
    </Container>
  )
}

export {PortableCode}
