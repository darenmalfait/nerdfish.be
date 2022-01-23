import * as React from 'react'

import type { Serialized } from './serializers.types'

import {
  FullscreenVideoEmbed,
  FullscreenVideoEmbedProps,
} from '~/components/elements'

function PortableVideoEmbed({ node }: Serialized<FullscreenVideoEmbedProps>) {
  return <FullscreenVideoEmbed {...node} />
}

export { PortableVideoEmbed }
