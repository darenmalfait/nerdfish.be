import { GenericErrorBoundary } from '~/route-containers/boundaries/generic-error-boundary'
import Component, {
  meta,
  CatchBoundary,
} from '~/route-containers/generic-page/generic-page.component'
import { loader } from '~/route-containers/generic-page/generic-page.server'

export { loader, meta, CatchBoundary, GenericErrorBoundary as ErrorBoundary }

export default Component
