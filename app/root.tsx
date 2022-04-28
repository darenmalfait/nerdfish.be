import Root, {
  ErrorBoundary,
  CatchBoundary,
  links,
  handle,
} from '~/route-containers/layout/layout.component'
import { loader } from '~/route-containers/layout/layout.server'

export default Root
export { ErrorBoundary, CatchBoundary, loader, links, handle }
