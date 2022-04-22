import Root, {
  ErrorBoundary,
  CatchBoundary,
  links,
} from '~/route-containers/layout/layout.component'
import { loader, handle } from '~/route-containers/layout/layout.server'

export default Root
export { ErrorBoundary, CatchBoundary, loader, links, handle }
