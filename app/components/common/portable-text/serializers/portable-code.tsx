import { CodeBlock } from '@daren/ui-components'
import palenight from 'prism-react-renderer/themes/palenight'
import * as React from 'react'

import type { Serialized } from './serializers.types'

import { Container } from '~/components/layout'
import type { SanityCode } from '~/types/sanity'

function PortableCode({ node }: Serialized<SanityCode>) {
  return (
    <Container size="small">
      <CodeBlock
        {...node}
        theme={palenight}
        className="!rounded-xl"
        language={node.language}
        showLineNumbers
      />
    </Container>
  )
}

export { PortableCode }
