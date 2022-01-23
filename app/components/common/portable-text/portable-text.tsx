import Builder, { PortableTextEntry } from '@sanity/block-content-to-react'
import * as React from 'react'

import { portableTextSerializers } from './serializers'

interface PortableTextProps {
  blocks: PortableTextEntry[]
}

function PortableText({ blocks, ...props }: PortableTextProps) {
  return (
    <Builder
      {...props}
      blocks={blocks}
      renderContainerOnSingleChild={true}
      imageOptions={{ w: 320, h: 240, fit: 'max' }}
      serializers={portableTextSerializers}
    />
  )
}

export { PortableText }
