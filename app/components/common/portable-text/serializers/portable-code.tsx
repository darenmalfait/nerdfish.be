import { CodeBlock } from '@daren/ui-components'

import type { PrismTheme } from 'prism-react-renderer'
import * as React from 'react'

import type { Serialized } from './serializers.types'
import theme from './vscode-theme'

import { Container } from '~/components/layout'
import type { SanityCode } from '~/types/sanity'

function PortableCode({ node }: Serialized<SanityCode>) {
  const lines = node.code.split(/\r\n|\r|\n/).length || 0

  return (
    <Container size="small">
      <CodeBlock
        {...node}
        theme={theme as PrismTheme}
        className="!rounded-xl"
        language={node.language}
        showLanguage={lines > 1}
        showLineNumbers={lines > 1}
      />
    </Container>
  )
}

export { PortableCode }
