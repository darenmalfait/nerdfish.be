import { withRouterHOC } from 'part:@sanity/base/router'
import { withPropsStream } from 'react-props-stream'

import { StructureMenuWidget } from './components'
import { toPropsStream } from './props'

export default {
  name: 'structure-menu',
  component: withRouterHOC(withPropsStream(toPropsStream, StructureMenuWidget)),
  layout: { width: 'full' },
}
